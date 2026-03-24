// packages/cli/src/server.ts
import { WebSocketServer, WebSocket } from "ws";
import * as fs from "node:fs";
import * as path from "node:path";
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

interface SketchServerOptions {
  port: number;
  apiKey?: string;
}

/**
 * Validate that a file path is within the project root to prevent
 * path traversal attacks via WebSocket messages.
 *
 * React fiber debug info often provides relative paths (e.g. "src/App.tsx")
 * or Vite-style paths ("/src/App.tsx"). We resolve these against projectRoot
 * so they map correctly instead of resolving against the CLI's CWD.
 */
function isPathSafe(filePath: string, projectRoot: string): boolean {
  const resolved = path.isAbsolute(filePath)
    ? path.resolve(filePath)
    : path.resolve(projectRoot, filePath);
  return resolved.startsWith(projectRoot + path.sep) || resolved === projectRoot;
}

/**
 * Resolve a file path that may be relative (from React fiber debug info)
 * to an absolute path within the project root.
 */
function resolveFilePath(filePath: string, projectRoot: string): string {
  if (path.isAbsolute(filePath)) return path.resolve(filePath);
  return path.resolve(projectRoot, filePath);
}

interface SketchServer {
  wss: WebSocketServer;
  close: () => void;
  getActiveClient: () => WebSocket | null;
}

export function createSketchServer(portOrOptions: number | SketchServerOptions): SketchServer {
  const { port, apiKey } = typeof portOrOptions === "number"
    ? { port: portOrOptions, apiKey: undefined }
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
          if (!isPathSafe(msg.filePath, projectRoot)) {
            console.warn(`[FrameUp] Blocked path traversal attempt: ${msg.filePath}`);
            send(ws, { type: "reorderComplete", success: false, error: "File path is outside the project root" });
            break;
          }
          const resolvedPath = resolveFilePath(msg.filePath, projectRoot);
          const prevContent = fs.readFileSync(resolvedPath, "utf-8");
          undoStack.push({
            filePath: resolvedPath,
            content: prevContent,
            timestamp: Date.now(),
          });

          try {
            const newSource = reorderComponent(
              resolvedPath,
              msg.fromLine,
              msg.toLine
            );
            fs.writeFileSync(resolvedPath, newSource, "utf-8");
            send(ws, { type: "reorderComplete", success: true });
          } catch (err) {
            // Revert undo stack on failure
            undoStack.pop();
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
          if (!isPathSafe(msg.filePath, projectRoot)) {
            console.warn(`[FrameUp] Blocked path traversal attempt: ${msg.filePath}`);
            send(ws, { type: "updatePropertyComplete", success: false, error: "File path is outside the project root" });
            break;
          }
          const resolvedPropPath = resolveFilePath(msg.filePath, projectRoot);
          const prevContent = fs.readFileSync(resolvedPropPath, "utf-8");
          undoStack.push({ filePath: resolvedPropPath, content: prevContent, timestamp: Date.now() });
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
            send(ws, { type: "updatePropertyComplete", success: true });
          } catch (err) {
            undoStack.pop();
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
          if (!isPathSafe(msg.filePath, projectRoot)) {
            console.warn(`[FrameUp] Blocked path traversal attempt: ${msg.filePath}`);
            send(ws, { type: "updatePropertyComplete", success: false, error: "File path is outside the project root" });
            break;
          }
          const resolvedPropsPath = resolveFilePath(msg.filePath, projectRoot);
          const prevContent = fs.readFileSync(resolvedPropsPath, "utf-8");
          undoStack.push({ filePath: resolvedPropsPath, content: prevContent, timestamp: Date.now() });
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
            send(ws, { type: "updatePropertyComplete", success: true });
          } catch (err) {
            undoStack.pop();
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
          if (!isPathSafe(msg.filePath, projectRoot)) {
            console.warn(`[FrameUp] Blocked path traversal attempt: ${msg.filePath}`);
            send(ws, { type: "updateTextComplete", success: false, error: "File path is outside the project root" });
            break;
          }
          const resolvedTextPath = resolveFilePath(msg.filePath, projectRoot);
          const prevContent = fs.readFileSync(resolvedTextPath, "utf-8");
          undoStack.push({ filePath: resolvedTextPath, content: prevContent, timestamp: Date.now() });
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
              send(ws, { type: "updateTextComplete", success: true });
            } else {
              undoStack.pop();
              send(ws, { type: "updateTextComplete", success: false, reason: "no-match" });
            }
          } catch (err) {
            undoStack.pop();
            send(ws, {
              type: "updateTextComplete",
              success: false,
              error: err instanceof Error ? err.message : String(err),
            });
          }
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
          if (!isPathSafe(msg.filePath, projectRoot)) {
            console.warn(`[FrameUp] Blocked path traversal attempt: ${msg.filePath}`);
            send(ws, { type: "siblingsList", siblings: [] });
            break;
          }
          try {
            const siblings = getSiblings(resolveFilePath(msg.filePath, projectRoot), msg.parentLine);
            send(ws, { type: "siblingsList", siblings });
          } catch (err) {
            send(ws, { type: "siblingsList", siblings: [] });
          }
          break;

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
            tokens: resolvedTokens,
            onProgress(stage, message) {
              send(ws, { type: "generateProgress", stage, message });
            },
          }).then((result) => {
            // Push undo entries BEFORE unlocking (#3 — entries captured before API call)
            if (result.success) {
              for (const entry of result.undoEntries) {
                undoStack.push({
                  filePath: entry.filePath,
                  content: entry.content,
                  timestamp: Date.now(),
                });
              }
            }
            send(ws, {
              type: "generateComplete",
              success: result.success,
              changes: result.changes,
              error: result.error,
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
