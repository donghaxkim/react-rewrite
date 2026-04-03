import type { TextEditAnchor } from "@react-rewrite/shared";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkStringify from "remark-stringify";

const mdxProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkMdx)
  .use(remarkStringify, {
    fences: true,
    emphasis: "*",
    bullet: "-",
    listItemIndent: "one",
  });

interface MdxPoint {
  line: number;
  column: number;
  offset?: number;
}

interface MdxPosition {
  start?: MdxPoint;
  end?: MdxPoint;
}

interface MdxNode {
  type: string;
  value?: string;
  children?: MdxNode[];
  position?: MdxPosition;
  depth?: number;
}

interface RenderedCharMapping {
  rawStart: number;
  rawEnd: number;
}

interface LeafSegment {
  node: MdxNode;
  rawText: string;
  renderedText: string;
  renderedChars: RenderedCharMapping[];
  start: number;
  end: number;
}

interface ContainerCandidate {
  node: MdxNode;
  renderedText: string;
  segments: LeafSegment[];
  depth: number;
  startOffset: number;
  endOffset: number;
}

interface TextDiff {
  oldSubstring: string;
  newSubstring: string;
  prefixLen: number;
}

interface MdxTextEditResult {
  source: string;
  changed: boolean;
  error?: string;
}

interface SegmentBuildState {
  cursor: number;
  previousEndsWithWhitespace: boolean;
}

interface EditRange {
  start: number;
  end: number;
  replacement: string;
}

const PRUNABLE_EMPTY_NODE_TYPES = new Set([
  "emphasis",
  "strong",
  "delete",
  "link",
  "linkReference",
  "paragraph",
  "heading",
  "blockquote",
  "listItem",
  "mdxJsxTextElement",
  "mdxJsxFlowElement",
]);

export function isMdxTextFile(filePath: string): boolean {
  return filePath.endsWith(".mdx") || filePath.endsWith(".md");
}

export function applyMdxTextEdit(
  source: string,
  line: number,
  col: number,
  originalText: string,
  newText: string,
  cursorOffset?: number,
  textAnchor?: TextEditAnchor,
): MdxTextEditResult {
  if (originalText === newText) {
    return { source, changed: false };
  }

  const tree = mdxProcessor.parse(source) as unknown as MdxNode;
  const candidate = selectBestContainer(tree, line, col, originalText);
  if (!candidate) {
    return {
      source,
      changed: false,
      error: `No matching text "${originalText}" found in markdown at ${line}:${col}`,
    };
  }

  const diff = findTextDiff(originalText, newText);
  if (!diff) {
    return { source, changed: false };
  }

  const editRange = resolveEditRange(candidate.renderedText, diff, cursorOffset, textAnchor);
  if (!editRange) {
    return {
      source,
      changed: false,
      error: `No matching text "${originalText}" found in markdown at ${line}:${col}`,
    };
  }

  const mutated = applyEditToContainer(candidate, editRange);
  if (!mutated) {
    return {
      source,
      changed: false,
      error: `No matching text "${originalText}" found in markdown at ${line}:${col}`,
    };
  }

  pruneEmptyNodes(candidate.node);
  mergeAdjacentTextNodes(candidate.node);

  const replacement = serializeContainer(candidate.node);
  const updatedSource =
    source.slice(0, candidate.startOffset) +
    replacement +
    source.slice(candidate.endOffset);

  return {
    source: updatedSource,
    changed: updatedSource !== source,
  };
}

function selectBestContainer(
  tree: MdxNode,
  line: number,
  col: number,
  originalText: string,
): ContainerCandidate | null {
  const candidates = collectContainerCandidates(tree);
  if (candidates.length === 0) return null;

  const normalizedOriginal = normalizeTextForMatch(originalText);
  const exactTextMatches = candidates.filter(
    (candidate) => normalizeTextForMatch(candidate.renderedText) === normalizedOriginal,
  );
  const partialTextMatches = candidates.filter((candidate) => {
    const normalizedCandidate = normalizeTextForMatch(candidate.renderedText);
    return normalizedCandidate.includes(normalizedOriginal) || normalizedOriginal.includes(normalizedCandidate);
  });

  const pool =
    exactTextMatches.length > 0
      ? exactTextMatches
      : partialTextMatches.length > 0
        ? partialTextMatches
        : candidates;

  let best: ContainerCandidate | null = null;
  let bestScore = Number.NEGATIVE_INFINITY;
  for (const candidate of pool) {
    const score = scoreCandidate(candidate, line, col, normalizedOriginal);
    if (score > bestScore) {
      best = candidate;
      bestScore = score;
    }
  }

  return bestScore > Number.NEGATIVE_INFINITY ? best : null;
}

function collectContainerCandidates(root: MdxNode): ContainerCandidate[] {
  const candidates: ContainerCandidate[] = [];

  const visit = (node: MdxNode, depth: number): void => {
    if (node.type !== "root" && Array.isArray(node.children) && node.children.length > 0) {
      const built = buildContainerCandidate(node, depth);
      if (built && normalizeTextForMatch(built.renderedText)) {
        candidates.push(built);
      }
    }

    for (const child of node.children ?? []) {
      visit(child, depth + 1);
    }
  };

  visit(root, 0);
  return candidates;
}

function buildContainerCandidate(node: MdxNode, depth: number): ContainerCandidate | null {
  const startOffset = node.position?.start?.offset;
  const endOffset = node.position?.end?.offset;
  if (startOffset == null || endOffset == null) return null;

  const state: SegmentBuildState = { cursor: 0, previousEndsWithWhitespace: false };
  const segments = buildLeafSegments(node, state);
  const renderedText = segments.map((segment) => segment.renderedText).join("");

  return {
    node,
    renderedText,
    segments,
    depth,
    startOffset,
    endOffset,
  };
}

function buildLeafSegments(node: MdxNode, state: SegmentBuildState): LeafSegment[] {
  if (isEditableLeaf(node)) {
    return buildLeafSegment(node, state);
  }

  const segments: LeafSegment[] = [];
  for (const child of node.children ?? []) {
    segments.push(...buildLeafSegments(child, state));
  }
  return segments;
}

function buildLeafSegment(node: MdxNode, state: SegmentBuildState): LeafSegment[] {
  const rawText = node.value ?? "";
  if (!rawText) return [];

  const renderedChars: RenderedCharMapping[] = [];
  let renderedText = "";
  let rawIndex = 0;
  let previousEndsWithWhitespace = state.previousEndsWithWhitespace;

  while (rawIndex < rawText.length) {
    const char = rawText[rawIndex];
    if (isCollapsibleWhitespaceChar(char)) {
      const runStart = rawIndex;
      while (rawIndex < rawText.length && isCollapsibleWhitespaceChar(rawText[rawIndex])) {
        rawIndex++;
      }
      if (!previousEndsWithWhitespace) {
        renderedText += " ";
        renderedChars.push({ rawStart: runStart, rawEnd: rawIndex });
        previousEndsWithWhitespace = true;
      }
      continue;
    }

    renderedText += char === "\u00a0" ? " " : char;
    renderedChars.push({ rawStart: rawIndex, rawEnd: rawIndex + 1 });
    rawIndex++;
    previousEndsWithWhitespace = false;
  }

  state.previousEndsWithWhitespace = previousEndsWithWhitespace;

  if (!renderedText) {
    return [];
  }

  const segment: LeafSegment = {
    node,
    rawText,
    renderedText,
    renderedChars,
    start: state.cursor,
    end: state.cursor + renderedText.length,
  };
  state.cursor = segment.end;
  return [segment];
}

function scoreCandidate(
  candidate: ContainerCandidate,
  line: number,
  col: number,
  normalizedOriginal: string,
): number {
  const normalizedCandidate = normalizeTextForMatch(candidate.renderedText);
  const exactText = normalizedCandidate === normalizedOriginal;
  const containsText =
    normalizedOriginal.length > 0 &&
    (normalizedCandidate.includes(normalizedOriginal) || normalizedOriginal.includes(normalizedCandidate));

  const exactStart = isExactStart(candidate.node, line, col);
  const containsPosition = containsSourcePosition(candidate.node, line, col);
  const span = candidate.endOffset - candidate.startOffset;

  let score = 0;
  if (exactText) score += 1000;
  else if (containsText) score += 300;

  if (exactStart) score += 240;
  else if (containsPosition) score += 160;

  if (!exactText && !containsText && !exactStart && !containsPosition) {
    score -= 5000;
  }

  score -= candidate.depth * 2;
  score -= span / 1000;
  return score;
}

function resolveEditRange(
  renderedText: string,
  diff: TextDiff,
  cursorOffset?: number,
  textAnchor?: TextEditAnchor,
): EditRange | null {
  if (textAnchor) {
    const anchoredStart = resolveAnchoredStart(renderedText, diff.oldSubstring, textAnchor);
    if (anchoredStart != null) {
      return {
        start: anchoredStart,
        end: anchoredStart + diff.oldSubstring.length,
        replacement: diff.newSubstring,
      };
    }
  }

  if (diff.oldSubstring) {
    const hintedStart =
      renderedText.slice(diff.prefixLen, diff.prefixLen + diff.oldSubstring.length) === diff.oldSubstring
        ? diff.prefixLen
        : renderedText.indexOf(diff.oldSubstring);
    if (hintedStart === -1) return null;
    return {
      start: hintedStart,
      end: hintedStart + diff.oldSubstring.length,
      replacement: diff.newSubstring,
    };
  }

  const insertionStart =
    cursorOffset != null
      ? Math.max(0, Math.min(renderedText.length, cursorOffset - diff.newSubstring.length))
      : diff.prefixLen;
  return {
    start: insertionStart,
    end: insertionStart,
    replacement: diff.newSubstring,
  };
}

function applyEditToContainer(candidate: ContainerCandidate, range: EditRange): boolean {
  const { segments } = candidate;
  if (segments.length === 0) return false;

  if (range.start === range.end) {
    return applyInsertion(segments, range.start, range.replacement);
  }

  const affected = segments.filter((segment) => segment.end > range.start && segment.start < range.end);
  if (affected.length === 0) return false;

  const first = affected[0];
  const last = affected[affected.length - 1];
  const firstLocalStart = Math.max(0, range.start - first.start);
  const lastLocalEnd = Math.max(0, range.end - last.start);

  if (first === last) {
    const replaced = replaceWithinLeaf(first, firstLocalStart, lastLocalEnd, range.replacement);
    return replaced;
  }

  const firstRawStart = mapRenderedOffsetToRawIndex(first, firstLocalStart, "start");
  const lastRawEnd = mapRenderedOffsetToRawIndex(last, lastLocalEnd, "end");
  const firstPrefix = first.rawText.slice(0, firstRawStart);
  const lastSuffix = last.rawText.slice(lastRawEnd);

  first.node.value = firstPrefix + range.replacement;
  last.node.value = lastSuffix;

  for (let i = 1; i < affected.length - 1; i++) {
    affected[i].node.value = "";
  }

  return true;
}

function applyInsertion(segments: LeafSegment[], offset: number, text: string): boolean {
  if (!text) return true;

  for (const segment of segments) {
    if (offset > segment.start && offset < segment.end) {
      return replaceWithinLeaf(segment, offset - segment.start, offset - segment.start, text);
    }
  }

  const previous = [...segments].reverse().find((segment) => segment.end <= offset);
  if (previous) {
    return replaceWithinLeaf(previous, previous.renderedText.length, previous.renderedText.length, text);
  }

  const next = segments.find((segment) => segment.start >= offset);
  if (next) {
    return replaceWithinLeaf(next, 0, 0, text);
  }

  return false;
}

function replaceWithinLeaf(
  segment: LeafSegment,
  start: number,
  end: number,
  replacement: string,
): boolean {
  const rawStart = mapRenderedOffsetToRawIndex(segment, start, "start");
  const rawEnd = mapRenderedOffsetToRawIndex(segment, end, "end");
  if (rawStart < 0 || rawEnd < rawStart) return false;

  segment.node.value =
    segment.rawText.slice(0, rawStart) +
    replacement +
    segment.rawText.slice(rawEnd);

  return true;
}

function mapRenderedOffsetToRawIndex(
  segment: LeafSegment,
  renderedOffset: number,
  bias: "start" | "end",
): number {
  if (segment.renderedChars.length === 0) return 0;
  if (renderedOffset <= 0) {
    return segment.renderedChars[0].rawStart;
  }
  if (renderedOffset >= segment.renderedChars.length) {
    return segment.renderedChars[segment.renderedChars.length - 1].rawEnd;
  }

  if (bias === "end") {
    return segment.renderedChars[renderedOffset - 1].rawEnd;
  }

  return segment.renderedChars[renderedOffset].rawStart;
}

function pruneEmptyNodes(node: MdxNode): void {
  if (!Array.isArray(node.children)) return;

  const nextChildren: MdxNode[] = [];
  for (const child of node.children) {
    pruneEmptyNodes(child);

    if (isEditableLeaf(child) && !child.value) {
      continue;
    }

    if (Array.isArray(child.children) && child.children.length === 0 && PRUNABLE_EMPTY_NODE_TYPES.has(child.type)) {
      continue;
    }

    nextChildren.push(child);
  }

  node.children = nextChildren;
}

function mergeAdjacentTextNodes(node: MdxNode): void {
  if (!Array.isArray(node.children) || node.children.length === 0) return;

  for (const child of node.children) {
    mergeAdjacentTextNodes(child);
  }

  const merged: MdxNode[] = [];
  for (const child of node.children) {
    const previous = merged[merged.length - 1];
    if (previous?.type === "text" && child.type === "text") {
      previous.value = `${previous.value ?? ""}${child.value ?? ""}`;
      continue;
    }
    merged.push(child);
  }

  node.children = merged;
}

function serializeContainer(node: MdxNode): string {
  if (!hasVisibleContent(node)) {
    return "";
  }

  const serialized = String(mdxProcessor.stringify(node as any));
  return serialized.replace(/\r?\n$/, "");
}

function hasVisibleContent(node: MdxNode): boolean {
  if (isEditableLeaf(node)) {
    return Boolean(node.value);
  }

  return (node.children ?? []).some((child) => hasVisibleContent(child));
}

function isEditableLeaf(node: MdxNode): boolean {
  return node.type === "text" || node.type === "inlineCode";
}

function isExactStart(node: MdxNode, line: number, col: number): boolean {
  const start = node.position?.start;
  if (!start) return false;
  return start.line === line && (start.column === col || start.column === col + 1);
}

function containsSourcePosition(node: MdxNode, line: number, col: number): boolean {
  const start = node.position?.start;
  const end = node.position?.end;
  if (!start || !end) return false;

  const targetColumn = col + 1;
  const startsBefore =
    line > start.line || (line === start.line && (targetColumn >= start.column || col >= start.column));
  const endsAfter =
    line < end.line || (line === end.line && (targetColumn <= end.column || col <= end.column));
  return startsBefore && endsAfter;
}

function normalizeTextForMatch(value: string): string {
  return value
    .replace(/\u00a0/g, " ")
    .replace(/[ \t\r\n\f]+/g, " ")
    .trim();
}

function isCollapsibleWhitespaceChar(char: string): boolean {
  return char === " " || char === "\n" || char === "\r" || char === "\t" || char === "\f" || char === "\u00a0";
}

function findTextDiff(oldText: string, newText: string): TextDiff | null {
  if (oldText === newText) return null;

  let prefixLen = 0;
  while (prefixLen < oldText.length && prefixLen < newText.length && oldText[prefixLen] === newText[prefixLen]) {
    prefixLen++;
  }

  let oldSuffixStart = oldText.length;
  let newSuffixStart = newText.length;
  while (
    oldSuffixStart > prefixLen &&
    newSuffixStart > prefixLen &&
    oldText[oldSuffixStart - 1] === newText[newSuffixStart - 1]
  ) {
    oldSuffixStart--;
    newSuffixStart--;
  }

  const oldSubstring = oldText.slice(prefixLen, oldSuffixStart);
  const newSubstring = newText.slice(prefixLen, newSuffixStart);

  if (!oldSubstring && !newSubstring) return null;
  return { oldSubstring, newSubstring, prefixLen };
}

function anchorMatchesAt(renderedText: string, start: number, oldSubstring: string, textAnchor: TextEditAnchor): boolean {
  const oldLength = textAnchor.end - textAnchor.start;
  if (start < 0 || start + oldLength > renderedText.length) return false;
  if (oldSubstring && renderedText.slice(start, start + oldLength) !== oldSubstring) return false;

  if (textAnchor.contextBefore) {
    const before = renderedText.slice(Math.max(0, start - textAnchor.contextBefore.length), start);
    if (before !== textAnchor.contextBefore) return false;
  }

  if (textAnchor.contextAfter) {
    const after = renderedText.slice(start + oldLength, start + oldLength + textAnchor.contextAfter.length);
    if (after !== textAnchor.contextAfter) return false;
  }

  return true;
}

function resolveAnchoredStart(renderedText: string, oldSubstring: string, textAnchor: TextEditAnchor): number | null {
  const oldLength = textAnchor.end - textAnchor.start;
  if (anchorMatchesAt(renderedText, textAnchor.start, oldSubstring, textAnchor)) {
    return textAnchor.start;
  }

  const maxStart = renderedText.length - oldLength;
  const candidates: number[] = [];
  for (let start = 0; start <= maxStart; start++) {
    if (anchorMatchesAt(renderedText, start, oldSubstring, textAnchor)) {
      candidates.push(start);
    }
  }

  if (candidates.length === 0) {
    if (!oldSubstring && textAnchor.start >= 0 && textAnchor.start <= renderedText.length) {
      return textAnchor.start;
    }
    if (
      oldSubstring &&
      textAnchor.start >= 0 &&
      textAnchor.start + oldLength <= renderedText.length &&
      renderedText.slice(textAnchor.start, textAnchor.start + oldLength) === oldSubstring
    ) {
      return textAnchor.start;
    }
    return null;
  }

  if (candidates.length === 1) return candidates[0];

  return candidates.reduce((best, candidate) => {
    const bestDistance = Math.abs(best - textAnchor.start);
    const candidateDistance = Math.abs(candidate - textAnchor.start);
    return candidateDistance < bestDistance ? candidate : best;
  });
}
