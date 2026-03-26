// packages/cli/src/server.ts
import { WebSocketServer, WebSocket } from "ws";
import * as fs from "node:fs";
import * as path from "node:path";
import { randomUUID } from "node:crypto";
import type {
  ClientMessage,
  ServerMessage,
  UndoEntry,
  TransformErrorCode,
  TailwindTokenMap,
} from "@frameup/shared";
import { reorderComponent, getSiblings } from "./transform.js";
import { updateClassName, updateTextContent } from "./transform.js";
import { resolveTailwindConfig } from "./tailwind-resolver.js";
import { generate } from "./generate.js";
import { isProjectFilePathSafe, resolveProjectFilePath } from "./path-resolver.js";
import { discoverFile } from "./file-discovery.js";
import { applyAllChanges } from "./claude-apply.js";
import { executeBatch } from "./batch-transform.js";

interface SketchServerOptions {
  port: number;
  apiKey?: string;
  model?: string;
}

interface SketchServer {
  wss: WebSocketServer;
  close: () => void;
  getActiveClient: () => WebSocket | null;
}

export function createSketchServer(portOrOptions: number | SketchServerOptions): SketchServer {
  const { port, apiKey, model } = typeof portOrOptions === "number"
    ? { port: portOrOptions, apiKey: undefined, model: undefined }
    : portOrOptions;
  const wss = new WebSocketServer({ port });
  const projectRoot = path.resolve(process.cwd());
  const undoStack: UndoEntry[] = [];
  let activeClient: WebSocket | null = null;
  let processing = false;
  let generateLocked = false; // (#1) Lock queue during AI generation
  const queue: Array<{ msg: ClientMessage; ws: WebSocket }> = [];

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
    if (processing || generateLocked || queue.length === 0) return;
    processing = true;

    const { msg, ws } = queue.shift()!;

    try {
      switch (msg.type) {
        case "reorder": {
          if (!isProjectFilePathSafe(msg.filePath, projectRoot)) {
            const error = msg.filePath.trim()
              ? "File path is outside the project root"
              : "File path could not be resolved for this element";
            console.warn(`[FrameUp] Rejected reorder path: ${msg.filePath}`);
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

        case "updateProperty": {
          if (!isProjectFilePathSafe(msg.filePath, projectRoot)) {
            const error = msg.filePath.trim()
              ? "File path is outside the project root"
              : "File path could not be resolved for this element";
            console.warn(`[FrameUp] Rejected property update path: ${msg.filePath}`);
            send(ws, { type: "updatePropertyComplete", success: false, error });
            break;
          }
          const resolvedPropPath = resolveProjectFilePath(msg.filePath, projectRoot)!;
          const prevContent = fs.readFileSync(resolvedPropPath, "utf-8");
          const undoId = randomUUID();
          try {
            const newSource = updateClassName(resolvedPropPath, msg.lineNumber, msg.columnNumber, [{
              tailwindPrefix: msg.tailwindPrefix,
              tailwindToken: msg.tailwindToken,
              value: msg.value,
              relatedPrefixes: msg.relatedPrefixes,
              classPattern: msg.classPattern,
              standalone: msg.standalone,
            }]);
            fs.writeFileSync(resolvedPropPath, newSource, "utf-8");
            undoStack.push({ id: undoId, filePath: resolvedPropPath, content: prevContent, afterContent: newSource, timestamp: Date.now() });
            send(ws, { type: "updatePropertyComplete", success: true, undoId });
          } catch (err) {
            const errorCode = extractErrorCode(err);
            send(ws, {
              type: "updatePropertyComplete",
              success: false,
              error: err instanceof Error ? err.message : String(err),
              errorCode,
            });
          }
          break;
        }

        case "updateProperties": {
          if (!isProjectFilePathSafe(msg.filePath, projectRoot)) {
            const error = msg.filePath.trim()
              ? "File path is outside the project root"
              : "File path could not be resolved for this element";
            console.warn(`[FrameUp] Rejected property update path: ${msg.filePath}`);
            send(ws, { type: "updatePropertyComplete", success: false, error });
            break;
          }
          const resolvedPropsPath = resolveProjectFilePath(msg.filePath, projectRoot)!;
          const prevContent = fs.readFileSync(resolvedPropsPath, "utf-8");
          const undoId = randomUUID();
          try {
            const newSource = updateClassName(
              resolvedPropsPath, msg.lineNumber, msg.columnNumber,
              msg.updates.map((u: { tailwindPrefix: string; tailwindToken: string | null; value: string; relatedPrefixes?: string[]; classPattern?: string; standalone?: boolean }) => ({
                tailwindPrefix: u.tailwindPrefix,
                tailwindToken: u.tailwindToken,
                value: u.value,
                relatedPrefixes: u.relatedPrefixes,
                classPattern: u.classPattern,
                standalone: u.standalone,
              }))
            );
            fs.writeFileSync(resolvedPropsPath, newSource, "utf-8");
            undoStack.push({ id: undoId, filePath: resolvedPropsPath, content: prevContent, afterContent: newSource, timestamp: Date.now() });
            send(ws, { type: "updatePropertyComplete", success: true, undoId });
          } catch (err) {
            const errorCode = extractErrorCode(err);
            send(ws, {
              type: "updatePropertyComplete",
              success: false,
              error: err instanceof Error ? err.message : String(err),
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
            console.warn(`[FrameUp] Rejected text update path: ${msg.filePath}`);
            send(ws, { type: "updateTextComplete", success: false, error });
            break;
          }
          const resolvedTextPath = resolveProjectFilePath(msg.filePath, projectRoot)!;
          const prevContent = fs.readFileSync(resolvedTextPath, "utf-8");
          const undoId = randomUUID();
          try {
            const newSource = updateTextContent(
              resolvedTextPath,
              msg.lineNumber,
              msg.columnNumber,
              msg.originalText,
              msg.newText,
            );
            if (newSource !== null) {
              fs.writeFileSync(resolvedTextPath, newSource, "utf-8");
              undoStack.push({ id: undoId, filePath: resolvedTextPath, content: prevContent, afterContent: newSource, timestamp: Date.now() });
              send(ws, { type: "updateTextComplete", success: true, undoId });
            } else {
              // no-match: no write happened, do not push undo entry
              send(ws, { type: "updateTextComplete", success: false, reason: "no-match" });
            }
          } catch (err) {
            send(ws, {
              type: "updateTextComplete",
              success: false,
              error: err instanceof Error ? err.message : String(err),
            });
          }
          break;
        }

        case "commitBatch": {
          try {
            const batchResult = executeBatch(msg.operations, projectRoot);

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
            const resultsWithUndo = batchResult.results.map(r => ({
              ...r,
              undoId: r.success ? batchUndoIds[0] : undefined, // simplified — all ops share file-level undo
            }));

            const allSuccess = batchResult.results.every(r => r.success);
            send(ws, {
              type: "commitBatchComplete",
              success: allSuccess,
              results: resultsWithUndo,
              undoIds: batchUndoIds,
            } as any);
          } catch (err) {
            send(ws, {
              type: "commitBatchComplete",
              success: false,
              results: msg.operations.map((op: any) => ({
                op: op.op,
                file: op.file,
                line: op.line ?? op.fromLine ?? 0,
                success: false,
                error: err instanceof Error ? err.message : String(err),
              })),
              undoIds: [],
            } as any);
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
      console.error("Error processing message:", err);
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
      console.warn("[FrameUp] Could not resolve Tailwind config:", err);
    }

    // Send config — tells overlay whether API key is available for Path B
    // NOTE: Config is sent once on connect and never updated. If the user adds
    // an API key to .env after FrameUp starts, the overlay won't know until
    // FrameUp is restarted. This is acceptable — .env changes require a process
    // restart by convention.
    send(ws, {
      type: "config",
      hasApiKey: !!(apiKey || process.env.ANTHROPIC_API_KEY),
    } as any);

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
            console.warn(`[FrameUp] Rejected siblings path: ${msg.filePath}`);
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

        case "applyAllChanges": {
          if (generateLocked) {
            send(ws, {
              type: "applyAllComplete",
              success: false,
              appliedCount: 0,
              failedCount: msg.changes.length,
              undoIds: [],
              error: "Another operation is in progress",
            } as any);
            break;
          }
          generateLocked = true;

          const resolvedKey = apiKey || process.env.ANTHROPIC_API_KEY;
          if (!resolvedKey) {
            generateLocked = false;
            send(ws, {
              type: "applyAllComplete",
              success: false,
              appliedCount: 0,
              failedCount: msg.changes.length,
              undoIds: [],
              error: "ANTHROPIC_API_KEY not set",
            } as any);
            break;
          }

          applyAllChanges({
            changes: msg.changes,
            apiKey: resolvedKey,
            projectRoot,
          })
            .then((result) => {
              const undoIds: string[] = [];
              for (const entry of result.undoEntries) {
                const undoId = `apply-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
                undoStack.push({
                  id: undoId,
                  filePath: entry.filePath,
                  content: entry.content,
                  afterContent: entry.afterContent,
                  timestamp: Date.now(),
                });
                undoIds.push(undoId);
              }
              send(ws, {
                type: "applyAllComplete",
                success: result.success,
                appliedCount: result.appliedCount,
                failedCount: result.failedCount,
                undoIds,
                error: result.error,
              } as any);
            })
            .catch((err) => {
              send(ws, {
                type: "applyAllComplete",
                success: false,
                appliedCount: 0,
                failedCount: msg.changes.length,
                undoIds: [],
                error: err instanceof Error ? err.message : "Unknown error",
              } as any);
            })
            .finally(() => {
              generateLocked = false;
              processQueue();
            });
          break;
        }

        case "generate": {
          const resolvedKey = apiKey || process.env.ANTHROPIC_API_KEY;
          if (!resolvedKey) {
            send(ws, {
              type: "generateComplete",
              success: false,
              changes: [],
              error: "No API key configured. Set ANTHROPIC_API_KEY in your environment:\n\nexport ANTHROPIC_API_KEY=sk-ant-...",
            });
            break;
          }

          // (#1) Lock the queue — no file writes until generate completes
          generateLocked = true;

          generate({
            annotations: msg.annotations,
            apiKey: resolvedKey,
            projectRoot: projectRoot,
            model: model,
            onProgress(stage, message) {
              send(ws, { type: "generateProgress", stage, message });
            },
          }).then((result) => {
            const undoIds: string[] = [];
            if (result.success) {
              for (const entry of result.undoEntries) {
                const undoId = randomUUID();
                undoStack.push({
                  id: undoId,
                  filePath: entry.filePath,
                  content: entry.content,
                  afterContent: entry.afterContent,
                  timestamp: Date.now(),
                });
                undoIds.push(undoId);
              }
            }
            send(ws, {
              type: "generateComplete",
              success: result.success,
              changes: result.changes,
              error: result.error,
              undoIds: result.success ? undoIds : undefined,
            });
          }).catch((err) => {
            send(ws, {
              type: "generateComplete",
              success: false,
              changes: [],
              error: err instanceof Error ? err.message : String(err),
            });
          }).finally(() => {
            // (#1) Unlock queue and drain any pending messages
            generateLocked = false;
            processQueue();
          });
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

  return {
    wss,
    close: () => wss.close(),
    getActiveClient: () => activeClient,
  };
}
