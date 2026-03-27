// packages/overlay/src/bridge.ts
import type { ClientMessage, ServerMessage } from "@react-rewrite/shared";
import { setCliTokens } from "./properties/tailwind-resolver.js";
type MessageHandler = (msg: ServerMessage) => void;

let ws: WebSocket | null = null;
let messageHandlers: MessageHandler[] = [];
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let onMaxRetriesExhausted: (() => void) | null = null;
let onTabTakenOver: (() => void) | null = null;
let onReconnectedCallback: (() => void) | null = null;
let savedPort: number | null = null;

type CommitResultListener = (success: boolean, errorCode?: string, errorMessage?: string) => void;
let commitResultListener: CommitResultListener | null = null;

export function onCommitResult(fn: CommitResultListener): void {
  commitResultListener = fn;
}

export function connect(port: number): void {
  if (ws && ws.readyState === WebSocket.OPEN) return;
  savedPort = port;

  ws = new WebSocket(`ws://localhost:${port}`);

  ws.onopen = () => {
    const wasReconnect = reconnectAttempts > 0;
    reconnectAttempts = 0;
    if (wasReconnect && onReconnectedCallback) {
      onReconnectedCallback();
    }
  };

  ws.onmessage = (event) => {
    try {
      const msg: ServerMessage = JSON.parse(event.data);
      // Handle Tailwind token messages from CLI
      if (msg.type === "tailwindTokens") {
        setCliTokens(msg.tokens);
      }
      // Surface transform commit results
      if (msg.type === "updatePropertyComplete" && commitResultListener) {
        commitResultListener(msg.success, msg.errorCode, msg.error);
      }
      messageHandlers.forEach((handler) => handler(msg));
    } catch {
      // Ignore malformed messages
    }
  };

  ws.onclose = (event) => {
    ws = null;

    if (event.code === 4001) {
      // Replaced by another tab — notify via disconnect callback
      if (onTabTakenOver) onTabTakenOver();
      return; // Don't reconnect
    }

    // Attempt reconnection with exponential backoff
    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      const delay = 500 * Math.pow(2, reconnectAttempts);
      reconnectAttempts++;
      reconnectTimer = setTimeout(() => connect(port), delay);
    } else if (onMaxRetriesExhausted) {
      onMaxRetriesExhausted();
    }
  };

  ws.onerror = () => {
    // onclose will fire after this
  };
}

export function send(msg: ClientMessage): void {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(msg));
  }
}

export function onMessage(handler: MessageHandler): () => void {
  messageHandlers.push(handler);
  return () => {
    messageHandlers = messageHandlers.filter((h) => h !== handler);
  };
}

export function disconnect(): void {
  if (reconnectTimer) clearTimeout(reconnectTimer);
  if (ws) {
    ws.close();
    ws = null;
  }
  messageHandlers = [];
}

/** Request file discovery from CLI. Returns a promise that resolves with filePath or null. */
export function requestFileDiscovery(componentName: string): Promise<string | null> {
  return new Promise((resolve) => {
    const unsub = onMessage((msg) => {
      if (msg.type === "discoverFileResult" && msg.componentName === componentName) {
        unsub();
        resolve(msg.filePath);
      }
    });
    send({ type: "discoverFile", componentName });
    // Timeout after 5 seconds
    setTimeout(() => { unsub(); resolve(null); }, 5000);
  });
}

export function setOnMaxRetries(callback: () => void): void {
  onMaxRetriesExhausted = callback;
}

export function setOnTabTakenOver(callback: () => void): void {
  onTabTakenOver = callback;
}

export function setOnReconnected(callback: () => void): void {
  onReconnectedCallback = callback;
}

export function manualReconnect(): void {
  if (savedPort) {
    reconnectAttempts = 0;
    connect(savedPort);
  }
}

/** Request file stat from CLI for staleness detection. */
export function requestFileStat(filePath: string): Promise<{ mtime: number; size: number }> {
  return new Promise((resolve) => {
    const unsub = onMessage((msg) => {
      if (msg.type === "fileStatResult" && msg.filePath === filePath) {
        unsub();
        resolve({ mtime: msg.mtime, size: msg.size });
      }
    });
    send({ type: "fileStat", filePath });
    // Timeout after 2 seconds
    setTimeout(() => { unsub(); resolve({ mtime: 0, size: 0 }); }, 2000);
  });
}
