// packages/cli/src/inject.ts
import * as http from "node:http";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import httpProxy from "http-proxy";
import { WebSocket } from "ws";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ProxyServerOptions {
  targetPort: number;
  targetHost: string;
  proxyPort: number;
  wsPort: number;
  getActiveClient: () => WebSocket | null;
}

export function createProxyServer(
  options: ProxyServerOptions
): http.Server {
  const { targetPort, targetHost, proxyPort, wsPort, getActiveClient } = options;

  const proxy = httpProxy.createProxyServer({
    target: `http://${targetHost}:${targetPort}`,
    ws: true,
    selfHandleResponse: true,
  });

  const overlayPath = path.join(__dirname, "overlay.js");
  let upstreamDown = false;

  const fontsDir = path.join(__dirname, "fonts");

  const server = http.createServer((req, res) => {
    // Normalize URL to prevent path traversal
    const normalizedUrl = new URL(req.url || "/", "http://localhost").pathname;

    // Serve overlay bundle
    if (normalizedUrl === "/__sketch-ui/overlay.js") {
      res.writeHead(200, { "Content-Type": "application/javascript" });
      fs.createReadStream(overlayPath).pipe(res);
      return;
    }

    // Serve font files
    if (normalizedUrl === "/__sketch-ui/inter-regular.woff2") {
      res.writeHead(200, {
        "Content-Type": "font/woff2",
        "Cache-Control": "public, max-age=31536000, immutable",
      });
      fs.createReadStream(path.join(fontsDir, "inter-regular.woff2")).pipe(res);
      return;
    }
    if (normalizedUrl === "/__sketch-ui/inter-semibold.woff2") {
      res.writeHead(200, {
        "Content-Type": "font/woff2",
        "Cache-Control": "public, max-age=31536000, immutable",
      });
      fs.createReadStream(path.join(fontsDir, "inter-semibold.woff2")).pipe(res);
      return;
    }

    // Set Accept-Encoding to identity to prevent chunked responses
    // (needed for Next.js App Router streaming)
    if (req.headers.accept?.includes("text/html")) {
      req.headers["accept-encoding"] = "identity";
    }

    proxy.web(req, res);
  });

  // Handle proxy response — inject script into HTML
  proxy.on("proxyRes", (proxyRes, req, res) => {
    const contentType = proxyRes.headers["content-type"] || "";
    const isHtml = contentType.includes("text/html");

    if (!isHtml) {
      // Pass through non-HTML responses
      res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
      proxyRes.pipe(res);
      return;
    }

    // Buffer HTML response for script injection
    const chunks: Buffer[] = [];
    proxyRes.on("data", (chunk: Buffer) => chunks.push(chunk));
    proxyRes.on("end", () => {
      let body = Buffer.concat(chunks).toString("utf-8");

      const injectedScript = `
<script src="/__sketch-ui/overlay.js"></script>
<script>window.__SKETCH_UI_WS_PORT__ = ${wsPort};</script>`;

      if (body.includes("</body>")) {
        body = body.replace("</body>", `${injectedScript}\n</body>`);
      } else {
        body += injectedScript;
      }

      // Update content-length and remove content-encoding
      const headers = { ...proxyRes.headers };
      delete headers["content-encoding"];
      delete headers["content-length"];
      headers["content-length"] = String(Buffer.byteLength(body));

      res.writeHead(proxyRes.statusCode || 200, headers);
      res.end(body);
    });
  });

  // Proxy WebSocket upgrades (for HMR)
  server.on("upgrade", (req, socket, head) => {
    proxy.ws(req, socket, head);
  });

  proxy.on("error", (err, req, res) => {
    if (!upstreamDown) {
      upstreamDown = true;
      const client = getActiveClient();
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "devServerDisconnected" }));
      }
    }
    if (res && "writeHead" in res) {
      (res as http.ServerResponse).writeHead(502, {
        "Content-Type": "text/plain",
      });
      (res as http.ServerResponse).end("Dev server unavailable");
    }
  });

  // Periodically check if upstream recovered
  const recoveryInterval = setInterval(async () => {
    if (!upstreamDown) return;
    try {
      const resp = await fetch(`http://${targetHost}:${targetPort}`, {
        signal: AbortSignal.timeout(1000),
      });
      if (resp.ok || resp.status < 500) {
        upstreamDown = false;
        const client = getActiveClient();
        if (client && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "devServerReconnected" }));
        }
      }
    } catch {
      // Still down
    }
  }, 3000);

  // Clean up interval when server closes
  server.on("close", () => clearInterval(recoveryInterval));

  return server;
}
