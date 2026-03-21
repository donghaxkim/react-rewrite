// packages/cli/src/server.ts
import { WebSocketServer, WebSocket } from "ws";
import * as fs from "node:fs";
import type {
  ClientMessage,
  ServerMessage,
  UndoEntry,
  TransformErrorCode,
} from "@sketch-ui/shared";
import { reorderComponent, getSiblings } from "./transform.js";
import { updateClassName } from "./transform.js";
import { resolveTailwindConfig } from "./tailwind-resolver.js";

interface SketchServer {
  wss: WebSocketServer;
  close: () => void;
  getActiveClient: () => WebSocket | null;
}

export function createSketchServer(port: number): SketchServer {
  const wss = new WebSocketServer({ port });
  const undoStack: UndoEntry[] = [];
  let activeClient: WebSocket | null = null;
  let processing = false;
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
    if (processing || queue.length === 0) return;
    processing = true;

    const { msg, ws } = queue.shift()!;

    try {
      switch (msg.type) {
        case "reorder": {
          const prevContent = fs.readFileSync(msg.filePath, "utf-8");
          undoStack.push({
            filePath: msg.filePath,
            content: prevContent,
            timestamp: Date.now(),
          });

          try {
            const newSource = reorderComponent(
              msg.filePath,
              msg.fromLine,
              msg.toLine
            );
            fs.writeFileSync(msg.filePath, newSource, "utf-8");
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
          const prevContent = fs.readFileSync(msg.filePath, "utf-8");
          undoStack.push({ filePath: msg.filePath, content: prevContent, timestamp: Date.now() });
          try {
            const newSource = updateClassName(msg.filePath, msg.lineNumber, msg.columnNumber, [{
              tailwindPrefix: msg.tailwindPrefix,
              tailwindToken: msg.tailwindToken,
              value: msg.value,
              relatedPrefixes: msg.relatedPrefixes,
            }]);
            fs.writeFileSync(msg.filePath, newSource, "utf-8");
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
          const prevContent = fs.readFileSync(msg.filePath, "utf-8");
          undoStack.push({ filePath: msg.filePath, content: prevContent, timestamp: Date.now() });
          try {
            const newSource = updateClassName(
              msg.filePath, msg.lineNumber, msg.columnNumber,
              msg.updates.map(u => ({
                tailwindPrefix: u.tailwindPrefix,
                tailwindToken: u.tailwindToken,
                value: u.value,
                relatedPrefixes: u.relatedPrefixes,
              }))
            );
            fs.writeFileSync(msg.filePath, newSource, "utf-8");
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
    try {
      const projectRoot = process.cwd();
      const config = resolveTailwindConfig(projectRoot);
      send(ws, { type: "tailwindTokens", tokens: config.tokens });
    } catch (err) {
      console.warn("[SketchUI] Could not resolve Tailwind config:", err);
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
          try {
            const siblings = getSiblings(msg.filePath, msg.parentLine);
            send(ws, { type: "siblingsList", siblings });
          } catch (err) {
            send(ws, { type: "siblingsList", siblings: [] });
          }
          break;

        case "reorder":
        case "undo":
        case "updateProperty":
        case "updateProperties":
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
