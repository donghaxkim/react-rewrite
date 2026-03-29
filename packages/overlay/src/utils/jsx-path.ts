import { getFiberFromHostInstance, getDisplayName, isCompositeFiber } from "bippy";
import type { JSXStructuralPath, JSXPathSegment } from "@react-rewrite/shared";

// HTML tag names for filtering out React internals
const HTML_TAGS = new Set([
  "a","abbr","address","area","article","aside","audio","b","base","bdi","bdo",
  "blockquote","body","br","button","canvas","caption","cite","code","col",
  "colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl",
  "dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2",
  "h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img",
  "input","ins","kbd","label","legend","li","link","main","map","mark","menu",
  "meta","meter","nav","noscript","object","ol","optgroup","option","output","p",
  "picture","pre","progress","q","rp","rt","ruby","s","samp","script","search",
  "section","select","slot","small","source","span","strong","sub","summary",
  "sup","table","tbody","td","template","textarea","tfoot","th","thead","time",
  "title","tr","track","u","ul","var","video","wbr",
]);

/**
 * Build a deterministic JSX structural path from a DOM element up to its
 * owning component boundary.
 *
 * Returns null if the fiber tree can't be walked or the component boundary
 * isn't found.
 */
export function buildJSXPath(
  element: HTMLElement,
  filePath: string,
  componentName: string,
): JSXStructuralPath | null {
  const fiber = getFiberFromHostInstance(element);
  if (!fiber) return null;

  const segments: JSXPathSegment[] = [];
  let current = fiber;
  let foundBoundary = false;

  while (current) {
    // Check if this is the component boundary (composite fiber matching componentName)
    if (isCompositeFiber(current)) {
      const name = getDisplayName(current);
      if (name === componentName) {
        foundBoundary = true;
        break;
      }
    }

    // Determine if this fiber should be included as a path segment
    const fiberType = current.type;

    // Skip fibers with symbol types (Fragment, StrictMode, Suspense, Context, etc.)
    if (typeof fiberType === "symbol") {
      current = current.return;
      continue;
    }

    let name: string | null = null;

    if (typeof fiberType === "string") {
      // Host fiber (div, span, etc.)
      name = fiberType;
    } else if (isCompositeFiber(current)) {
      // Composite fiber — get display name
      const displayName = getDisplayName(current);
      // Only include user-level components (uppercase first letter)
      if (displayName && displayName[0] === displayName[0].toUpperCase() && /^[A-Z]/.test(displayName)) {
        name = displayName;
      }
    }

    if (name === null) {
      current = current.return;
      continue;
    }

    // Skip non-HTML lowercase names that slipped through (e.g. from non-string non-symbol types)
    if (name[0] === name[0].toLowerCase() && !HTML_TAGS.has(name)) {
      current = current.return;
      continue;
    }

    // Determine discriminator
    let discriminator: JSXPathSegment["discriminator"];

    if (current.key != null && !String(current.key).startsWith(".")) {
      // Explicit key (not auto-generated)
      discriminator = { type: "key", value: String(current.key) };
    } else {
      // Compute sibling index: count same-type fibers before this one
      let siblingIndex = 0;
      if (current.return) {
        let sibling = current.return.child;
        while (sibling && sibling !== current) {
          // Match by type: === for functions, string comparison for host elements
          if (sibling.type === fiberType) {
            siblingIndex++;
          }
          sibling = sibling.sibling;
        }
      }
      discriminator = { type: "index", value: siblingIndex };
    }

    // classHint: first 3 classes if the fiber has a DOM element
    let classHint: string[] | undefined;
    if (current.stateNode instanceof HTMLElement) {
      const className = current.stateNode.className;
      if (className && typeof className === "string") {
        const classes = className.split(/\s+/).filter(Boolean).slice(0, 3);
        if (classes.length > 0) {
          classHint = classes;
        }
      }
    }

    segments.push({ name, discriminator, classHint });

    current = current.return;
  }

  if (!foundBoundary) return null;

  // Walk was bottom-up; path should be top-down
  segments.reverse();

  // Set the first segment's discriminator to root
  if (segments.length > 0) {
    segments[0].discriminator = { type: "root" };
  }

  return {
    componentName,
    filePath,
    segments,
  };
}
