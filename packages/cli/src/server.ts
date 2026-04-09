// packages/cli/src/server.ts
import { WebSocketServer, WebSocket } from "ws";
import * as fs from "node:fs";
import * as path from "node:path";
import { randomUUID } from "node:crypto";
import type {
  BatchOperation,
  ClientMessage,
  ServerMessage,
  UndoEntry,
  TransformErrorCode,
  TailwindTokenMap,
} from "@react-rewrite/shared";
import type { RegistryItem, RegistryItemFull, ProjectConfig } from "@react-rewrite/shared";
import { reorderComponent, getSiblings } from "./transform.js";
import { updateClassName, updateTextContent } from "./transform.js";
import { logger } from "./logger.js";
import { resolveTailwindConfig } from "./tailwind-resolver.js";
import { isProjectFilePathSafe, resolveProjectFilePath } from "./path-resolver.js";
import { discoverFile } from "./file-discovery.js";
import { executeBatch } from "./batch-transform.js";
import { ShadcnProvider } from "./registry/shadcn-provider.js";
import { getCacheDir, writeCachedIndex, writeCachedItem, readCachedIndex, readCachedItem, isCacheStale } from "./registry/registry-cache.js";
import { writeComponentFiles } from "./registry/component-writer.js";
import { compileAllComponents } from "./registry/component-compiler.js";

interface SketchServerOptions {
  port: number;
}

interface SketchServer {
  wss: WebSocketServer;
  close: () => void;
  getActiveClient: () => WebSocket | null;
}

export function attachUndoIdsToBatchResults(
  results: Array<{ op: BatchOperation["op"]; file: string; line: number; success: boolean; error?: string }>,
  undoEntries: Array<{ filePath: string; content: string; afterContent: string }>,
  undoIds: string[],
  projectRoot: string,
) {
  const undoIdByFile = new Map<string, string>();
  undoEntries.forEach((entry, index) => {
    const resolved = path.resolve(projectRoot, entry.filePath);
    const undoId = undoIds[index];
    if (undoId) undoIdByFile.set(resolved, undoId);
  });

  return results.map((result) => {
    const resolvedResultPath = path.resolve(projectRoot, result.file);
    return {
      ...result,
      undoId: result.success ? undoIdByFile.get(resolvedResultPath) : undefined,
    };
  });
}

function detectProjectConfig(projectRoot: string): ProjectConfig {
  const hasTsConfig = fs.existsSync(path.join(projectRoot, "tsconfig.json"));

  let pathAlias: string | null = null;
  if (hasTsConfig) {
    try {
      const tsConfig = JSON.parse(fs.readFileSync(path.join(projectRoot, "tsconfig.json"), "utf-8"));
      const paths = tsConfig.compilerOptions?.paths ?? {};
      for (const [alias] of Object.entries(paths)) {
        if (alias.endsWith("/*")) {
          pathAlias = alias.replace("/*", "/");
          break;
        }
      }
    } catch {}
  }

  let componentDir = path.join(projectRoot, "src", "components", "ui");
  const componentsJson = path.join(projectRoot, "components.json");
  if (fs.existsSync(componentsJson)) {
    try {
      const config = JSON.parse(fs.readFileSync(componentsJson, "utf-8"));
      if (config.aliases?.components) {
        const alias = config.aliases.components.replace(/^@\//, "src/");
        componentDir = path.join(projectRoot, alias, "ui");
      }
    } catch {}
  } else if (!fs.existsSync(path.join(projectRoot, "src"))) {
    componentDir = path.join(projectRoot, "components", "ui");
  }

  let packageManager: "pnpm" | "npm" | "yarn" = "npm";
  if (fs.existsSync(path.join(projectRoot, "pnpm-lock.yaml"))) packageManager = "pnpm";
  else if (fs.existsSync(path.join(projectRoot, "yarn.lock"))) packageManager = "yarn";

  return { componentDir, isTypeScript: hasTsConfig, pathAlias, packageManager, projectRoot };
}

export function createSketchServer(portOrOptions: number | SketchServerOptions): SketchServer {
  const port = typeof portOrOptions === "number" ? portOrOptions : portOrOptions.port;
  const wss = new WebSocketServer({ port });
  const projectRoot = path.resolve(process.cwd());
  const undoStack: UndoEntry[] = [];
  let activeClient: WebSocket | null = null;
  let processing = false;
  const queue: Array<{ msg: ClientMessage; ws: WebSocket }> = [];

  const shadcnProvider = new ShadcnProvider();
  let registryIndex: RegistryItem[] = [];
  let registryReady = false;
  let registryItemCache: Map<string, RegistryItemFull> = new Map();

  async function prefetchRegistry(projectRoot: string): Promise<void> {
    const cacheDir = getCacheDir(projectRoot);

    const cachedIndex = readCachedIndex(cacheDir);
    if (cachedIndex && !isCacheStale(cacheDir)) {
      registryIndex = cachedIndex;
      for (const item of cachedIndex) {
        const cached = readCachedItem(cacheDir, item.type, item.name);
        if (cached) registryItemCache.set(item.name, cached);
      }
      registryReady = true;
      logger.info(`[Registry] Loaded ${registryItemCache.size} items from cache`);
      // Compile components for live preview in the overlay
      const allItems = Array.from(registryItemCache.values());
      await compileAllComponents(allItems, projectRoot);
      return;
    }

    logger.info("[Registry] Prefetching shadcn registry...");
    try {
      const items = await shadcnProvider.fetchAll((fetched, total) => {
        // Broadcast progress to connected clients
        for (const client of wss.clients) {
          if (client.readyState === 1) { // WebSocket.OPEN
            client.send(JSON.stringify({ type: "registryPrefetchProgress", fetched, total }));
          }
        }
      });

      registryIndex = items.map(({ files, ...rest }) => rest);
      for (const item of items) {
        registryItemCache.set(item.name, item);
        writeCachedItem(cacheDir, item.type, item);
      }
      writeCachedIndex(cacheDir, registryIndex);
      registryReady = true;
      logger.info(`[Registry] Prefetched ${items.length} items`);
      // Compile components for live preview in the overlay
      await compileAllComponents(items, projectRoot);
    } catch (err) {
      logger.error("[Registry] Prefetch failed:", err instanceof Error ? err.message : String(err));
    }
  }

  function extractErrorCode(err: unknown): TransformErrorCode | undefined {
    if (err instanceof Error) {
      const match = err.message.match(/^(DYNAMIC_CLASSNAME|FILE_CHANGED|MAPPED_ELEMENT|CONFLICTING_CLASS)/);
      if (match) return match[1] as TransformErrorCode;
    }
    return undefined;
  }

  function send(ws: WebSocket, msg: ServerMessage) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg));
    }
  }

  async function processQueue() {
    if (processing || queue.length === 0) return;
    processing = true;

    const { msg, ws } = queue.shift()!;

    try {
      switch (msg.type) {
        case "reorder": {
          if (!isProjectFilePathSafe(msg.filePath, projectRoot)) {
            const error = msg.filePath.trim()
              ? "File path is outside the project root"
              : "File path could not be resolved for this element";
            logger.warn(`[ReactRewrite] Rejected reorder path: ${msg.filePath}`);
            send(ws, { type: "reorderComplete", success: false, error });
            break;
          }
          const resolvedPath = resolveProjectFilePath(msg.filePath, projectRoot)!;
          const prevContent = fs.readFileSync(resolvedPath, "utf-8");
          const undoId = randomUUID();

          try {
            const newSource = reorderComponent(
              resolvedPath,
              msg.fromLine,
              msg.toLine
            );
            fs.writeFileSync(resolvedPath, newSource, "utf-8");
            undoStack.push({
              id: undoId,
              filePath: resolvedPath,
              content: prevContent,
              afterContent: newSource,
              timestamp: Date.now(),
            });
            send(ws, { type: "reorderComplete", success: true });
          } catch (err) {
            send(ws, {
              type: "reorderComplete",
              success: false,
              error: err instanceof Error ? err.message : String(err),
            });
          }
          break;
        }

        case "undo": {
          const entry = undoStack.pop();
          if (!entry) {
            send(ws, {
              type: "undoComplete",
              success: false,
              error: "Nothing to undo",
            });
          } else {
            fs.writeFileSync(entry.filePath, entry.content, "utf-8");
            send(ws, { type: "undoComplete", success: true });
          }
          break;
        }

        case "updateProperty":
        case "updateProperties": {
          if (!isProjectFilePathSafe(msg.filePath, projectRoot)) {
            const error = msg.filePath.trim()
              ? "File path is outside the project root"
              : "File path could not be resolved for this element";
            logger.warn(`[ReactRewrite] Rejected property update path: ${msg.filePath}`);
            send(ws, { type: "updatePropertyComplete", success: false, error });
            break;
          }

          // Build updates array from either single or batch message
          const updates = msg.type === "updateProperty"
            ? [{
                tailwindPrefix: msg.tailwindPrefix,
                tailwindToken: msg.tailwindToken,
                value: msg.value,
                relatedPrefixes: msg.relatedPrefixes,
                classPattern: msg.classPattern,
                standalone: msg.standalone,
              }]
            : msg.updates.map((u: typeof msg.updates[number]) => ({
                tailwindPrefix: u.tailwindPrefix,
                tailwindToken: u.tailwindToken,
                value: u.value,
                relatedPrefixes: u.relatedPrefixes,
                classPattern: u.classPattern,
                standalone: u.standalone,
              }));

          // Route through batch engine for the resolution chain (handles React 19 owner stack positions)
          logger.debug(`[updateProperty] ${msg.filePath}:${msg.lineNumber} tag=${msg.tagName} class="${(msg.className || "").slice(0, 40)}"`);
          const batchResult = executeBatch(
            [{
              op: "updateClass" as const,
              file: msg.filePath,
              line: msg.lineNumber,
              col: msg.columnNumber,
              tagName: msg.tagName,
              className: msg.className,
              parentTagName: msg.parentTagName,
              parentClassName: msg.parentClassName,
              nthOfType: msg.nthOfType,
              id: msg.elementId,
              jsxPath: msg.jsxPath,
              updates,
            }],
            projectRoot,
          );

          const opResult = batchResult.results[0];
          logger.debug(`[updateProperty] Result: ${opResult?.success ? "OK" : "FAIL: " + opResult?.error}`);
          if (opResult?.success) {
            const undoId = randomUUID();
            for (const entry of batchResult.undoEntries) {
              undoStack.push({ id: undoId, filePath: entry.filePath, content: entry.content, afterContent: entry.afterContent, timestamp: Date.now() });
            }
            send(ws, { type: "updatePropertyComplete", success: true, undoId });
          } else {
            const errorCode = extractErrorCode(opResult?.error ? new Error(opResult.error) : undefined);
            send(ws, {
              type: "updatePropertyComplete",
              success: false,
              error: opResult?.error || "Unknown error",
              errorCode,
            });
          }
          break;
        }

        case "updateText": {
          if (!isProjectFilePathSafe(msg.filePath, projectRoot)) {
            const error = msg.filePath.trim()
              ? "File path is outside the project root"
              : "File path could not be resolved for this element";
            logger.warn(`[ReactRewrite] Rejected text update path: ${msg.filePath}`);
            send(ws, { type: "updateTextComplete", success: false, error });
            break;
          }
          // Route through batch engine for the resolution chain
          const textBatchResult = executeBatch(
            [{
              op: "updateText" as const,
              file: msg.filePath,
              line: msg.lineNumber,
              col: msg.columnNumber,
              tagName: msg.tagName,
              className: msg.className,
              parentTagName: msg.parentTagName,
              parentClassName: msg.parentClassName,
              nthOfType: msg.nthOfType,
              id: msg.elementId,
              jsxPath: msg.jsxPath,
              originalText: msg.originalText,
              newText: msg.newText,
              textAnchor: msg.textAnchor,
            }],
            projectRoot,
          );

          const textResult = textBatchResult.results[0];
          if (textResult?.success) {
            const undoId = randomUUID();
            for (const entry of textBatchResult.undoEntries) {
              undoStack.push({ id: undoId, filePath: entry.filePath, content: entry.content, afterContent: entry.afterContent, timestamp: Date.now() });
            }
            send(ws, { type: "updateTextComplete", success: true, undoId });
          } else {
            const reason = textResult?.error?.includes("No matching text") ? "no-match" : undefined;
            send(ws, {
              type: "updateTextComplete",
              success: false,
              error: textResult?.error,
              reason,
            });
          }
          break;
        }

        case "commitBatch": {
          logger.info(`[commitBatch] Received ${msg.operations.length} operations:`, msg.operations.map((o: BatchOperation) => `${o.op}@${o.file}:${o.op === "reorder" ? o.fromLine : o.line}`));
          try {
            // Pre-commit: write component files for insertComponent operations
            const insertOps = (msg.operations as BatchOperation[]).filter(
              (op): op is Extract<BatchOperation, { op: "insertComponent" }> => op.op === "insertComponent"
            );
            if (insertOps.length > 0) {
              const projectConfig = detectProjectConfig(projectRoot);
              for (const op of insertOps) {
                const item = registryItemCache.get(op.registryName);
                if (item) {
                  try {
                    writeComponentFiles(item, projectConfig);
                    for (const dep of item.registryDependencies) {
                      const depItem = registryItemCache.get(dep);
                      if (depItem) writeComponentFiles(depItem, projectConfig);
                    }
                  } catch (err) {
                    logger.error(`[commitBatch] Failed to write component files for ${op.registryName}:`, err);
                  }
                }
              }
            }

            const batchResult = executeBatch(msg.operations, projectRoot);
            const failedOps = batchResult.results.filter(r => !r.success);
            if (failedOps.length > 0) {
              logger.error(`[commitBatch] ${failedOps.length}/${batchResult.results.length} operations failed:`);
              for (const r of failedOps) {
                logger.error(`  ${r.op}@${r.file}:${r.line} — ${r.error}`);
              }
            } else {
              logger.info(`[commitBatch] All ${batchResult.results.length} operations succeeded`);
            }

            // Create undo entries for each file that was modified
            const batchUndoIds: string[] = [];
            for (const entry of batchResult.undoEntries) {
              const undoId = randomUUID();
              undoStack.push({
                id: undoId,
                filePath: entry.filePath,
                content: entry.content,
                afterContent: entry.afterContent,
                timestamp: Date.now(),
              });
              batchUndoIds.push(undoId);
            }

            // Map undo IDs to per-op results
            const resultsWithUndo = attachUndoIdsToBatchResults(
              batchResult.results,
              batchResult.undoEntries,
              batchUndoIds,
              projectRoot,
            );

            const allSuccess = batchResult.results.every(r => r.success);
            send(ws, {
              type: "commitBatchComplete",
              success: allSuccess,
              results: resultsWithUndo,
              undoIds: batchUndoIds,
            });
          } catch (err) {
            logger.error(`[commitBatch] Exception:`, err instanceof Error ? err.message : String(err));
            send(ws, {
              type: "commitBatchComplete",
              success: false,
              results: msg.operations.map((op: BatchOperation) => ({
                op: op.op,
                file: op.file,
                line: op.op === "reorder" ? op.fromLine : op.line,
                success: false,
                error: err instanceof Error ? err.message : String(err),
              })),
              undoIds: [],
            });
          }
          break;
        }

        case "revertChanges": {
          const results: Array<{ undoId: string; success: boolean; error?: string }> = [];

          // Collect found entries
          const entriesById = new Map<string, UndoEntry>();
          for (const id of msg.undoIds) {
            const entry = undoStack.find((e) => e.id === id);
            if (entry) {
              entriesById.set(id, entry);
            } else {
              results.push({ undoId: id, success: false, error: "Undo entry not found" });
            }
          }

          // Group by file path for coalesced revert
          const byFile = new Map<string, Array<{ id: string; entry: UndoEntry }>>();
          for (const [id, entry] of entriesById) {
            const group = byFile.get(entry.filePath) || [];
            group.push({ id, entry });
            byFile.set(entry.filePath, group);
          }

          // Process each file group
          for (const [filePath, group] of byFile) {
            // Sort by timestamp descending (most recent first)
            group.sort((a, b) => b.entry.timestamp - a.entry.timestamp);

            try {
              const currentContent = fs.readFileSync(filePath, "utf-8");
              // Check most recent entry's afterContent against current file
              const mostRecent = group[0].entry;
              if (currentContent !== mostRecent.afterContent) {
                for (const { id } of group) {
                  results.push({ undoId: id, success: false, error: "File has changed since this edit" });
                }
                continue;
              }

              // Write back the earliest entry's beforeContent (restores original state)
              const earliest = group[group.length - 1].entry;
              fs.writeFileSync(filePath, earliest.content, "utf-8");

              for (const { id, entry } of group) {
                entry.reverted = true;
                results.push({ undoId: id, success: true });
              }
            } catch (err) {
              for (const { id } of group) {
                results.push({ undoId: id, success: false, error: err instanceof Error ? err.message : String(err) });
              }
            }
          }

          send(ws, { type: "revertComplete", results });
          break;
        }
      }
    } catch (err) {
      // Catch-all for unexpected errors
      logger.error("Error processing message:", err);
    }

    processing = false;
    processQueue(); // Process next in queue
  }

  wss.on("connection", (ws) => {
    // Single client policy: close previous connection
    if (activeClient && activeClient.readyState === WebSocket.OPEN) {
      activeClient.close(4001, "replaced by new connection");
    }
    activeClient = ws;

    // Resolve and send Tailwind tokens
    let resolvedTokens: TailwindTokenMap | null = null;
    try {
      const config = resolveTailwindConfig(projectRoot);
      resolvedTokens = config.tokens;
      send(ws, { type: "tailwindTokens", tokens: config.tokens });
    } catch (err) {
      logger.warn("[ReactRewrite] Could not resolve Tailwind config:", err);
    }

    ws.on("message", (data) => {
      let msg: ClientMessage;
      try {
        msg = JSON.parse(data.toString());
      } catch {
        return; // Ignore malformed messages
      }

      switch (msg.type) {
        case "ping":
          send(ws, { type: "pong" });
          break;

        case "getSiblings":
          // Can run concurrently (read-only)
          if (!isProjectFilePathSafe(msg.filePath, projectRoot)) {
            logger.warn(`[ReactRewrite] Rejected siblings path: ${msg.filePath}`);
            send(ws, { type: "siblingsList", siblings: [] });
            break;
          }
          try {
            const siblings = getSiblings(resolveProjectFilePath(msg.filePath, projectRoot)!, msg.parentLine);
            send(ws, { type: "siblingsList", siblings });
          } catch (err) {
            send(ws, { type: "siblingsList", siblings: [] });
          }
          break;

        case "discoverFile": {
          // Async — won't block the event loop during grep
          discoverFile(msg.componentName, projectRoot).then((filePath) => {
            send(ws, { type: "discoverFileResult", componentName: msg.componentName, filePath });
          });
          break;
        }

        case "getComponentRegistry": {
          const components = registryIndex.filter(i => i.type === "component");
          const blocks = registryIndex.filter(i => i.type === "block");
          send(ws, { type: "componentRegistry", components, blocks });
          break;
        }

        case "fileStat": {
          if (!isProjectFilePathSafe(msg.filePath, projectRoot)) {
            send(ws, { type: "fileStatResult", filePath: msg.filePath, mtime: 0, size: 0 });
            break;
          }
          const resolvedStatPath = resolveProjectFilePath(msg.filePath, projectRoot);
          if (!resolvedStatPath) {
            send(ws, { type: "fileStatResult", filePath: msg.filePath, mtime: 0, size: 0 });
            break;
          }
          try {
            const stat = fs.statSync(resolvedStatPath);
            send(ws, {
              type: "fileStatResult",
              filePath: msg.filePath,
              mtime: stat.mtimeMs,
              size: stat.size,
            });
          } catch {
            send(ws, { type: "fileStatResult", filePath: msg.filePath, mtime: 0, size: 0 });
          }
          break;
        }

        case "reorder":
        case "undo":
        case "updateProperty":
        case "updateProperties":
        case "updateText":
        case "revertChanges":
        case "commitBatch":
          // Sequential processing
          queue.push({ msg, ws });
          processQueue();
          break;
      }
    });

    ws.on("close", () => {
      if (ws === activeClient) {
        activeClient = null;
        undoStack.length = 0; // Clear undo stack on disconnect
        queue.length = 0;
      }
    });
  });

  // Prefetch registry in the background after server starts
  prefetchRegistry(projectRoot).catch((err) => {
    logger.error("[Registry] Prefetch startup error:", err);
  });

  return {
    wss,
    close: () => wss.close(),
    getActiveClient: () => activeClient,
  };
}
