// packages/overlay/src/bridge.ts
import type { ClientMessage, ServerMessage } from "@sketch-ui/shared";

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

export function isConnected(): boolean {
  return ws !== null && ws.readyState === WebSocket.OPEN;
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
