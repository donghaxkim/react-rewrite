// packages/cli/src/inject.ts
import * as http from "node:http";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import httpProxy from "http-proxy";
import { WebSocket } from "ws";
import { getCompiledDir } from "./registry/component-compiler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ProxyServerOptions {
  targetPort: number;
  targetHost: string;
  proxyPort: number;
  wsPort: number;
  projectRoot: string;
  getActiveClient: () => WebSocket | null;
}

export function createProxyServer(
  options: ProxyServerOptions
): http.Server {
  const { targetPort, targetHost, proxyPort, wsPort, projectRoot, getActiveClient } = options;

  const proxy = httpProxy.createProxyServer({
    target: `http://${targetHost}:${targetPort}`,
    ws: true,
    selfHandleResponse: true,
  });

  const bundledOverlayPath = path.join(__dirname, "overlay.js");
  const workspaceOverlayPath = path.resolve(__dirname, "../../overlay/dist/overlay.js");
  const overlayPath = fs.existsSync(workspaceOverlayPath)
    ? workspaceOverlayPath
    : bundledOverlayPath;
  let upstreamDown = false;

  const fontsDir = path.join(__dirname, "fonts");

  const server = http.createServer((req, res) => {
    // Normalize URL to prevent path traversal
    const normalizedUrl = new URL(req.url || "/", "http://localhost").pathname;

    // Serve overlay bundle
    if (normalizedUrl === "/__react-rewrite/overlay.js") {
      res.writeHead(200, { "Content-Type": "application/javascript" });
      fs.createReadStream(overlayPath).pipe(res);
      return;
    }

    // Serve font files
    if (normalizedUrl === "/__react-rewrite/inter-regular.woff2") {
      res.writeHead(200, {
        "Content-Type": "font/woff2",
        "Cache-Control": "public, max-age=31536000, immutable",
      });
      fs.createReadStream(path.join(fontsDir, "inter-regular.woff2")).pipe(res);
      return;
    }
    if (normalizedUrl === "/__react-rewrite/inter-semibold.woff2") {
      res.writeHead(200, {
        "Content-Type": "font/woff2",
        "Cache-Control": "public, max-age=31536000, immutable",
      });
      fs.createReadStream(path.join(fontsDir, "inter-semibold.woff2")).pipe(res);
      return;
    }

    // Serve compiled preview modules for palette rendering
    const moduleMatch = normalizedUrl.match(/^\/__react-rewrite\/modules\/(.+)$/);
    if (moduleMatch) {
      const requestedPath = moduleMatch[1];
      const compiledRoot = getCompiledDir(projectRoot);
      const compiledPath = path.resolve(compiledRoot, requestedPath);
      if (compiledPath.startsWith(compiledRoot) && fs.existsSync(compiledPath)) {
        res.writeHead(200, {
          "Content-Type": "application/javascript",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        });
        fs.createReadStream(compiledPath).pipe(res);
        return;
      }
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`Module not compiled: ${requestedPath}`);
      return;
    }

    // For HTML requests: disable caching so we always get the full response
    // to inject into (prevents 304 Not Modified with empty body)
    if (req.headers.accept?.includes("text/html")) {
      req.headers["accept-encoding"] = "identity";
      delete req.headers["if-none-match"];
      delete req.headers["if-modified-since"];
    }

    proxy.web(req, res);
  });

  // Handle proxy response — inject script into HTML
  proxy.on("proxyRes", (proxyRes, _req, res) => {
    const contentType = proxyRes.headers["content-type"] || "";
    const isHtml = contentType.includes("text/html");
    const outRes = res as unknown as http.ServerResponse;

    if (!isHtml) {
      // Pass through non-HTML responses
      outRes.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
      proxyRes.pipe(outRes);
      return;
    }

    // Buffer HTML response for script injection
    const chunks: Uint8Array[] = [];
    proxyRes.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    proxyRes.on("end", () => {
      let body = Buffer.concat(chunks).toString("utf-8");

      const injectedScript = `
<script src="/__react-rewrite/overlay.js"></script>
<script>window.__REACT_REWRITE_WS_PORT__ = ${wsPort};</script>`;

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

      outRes.writeHead(proxyRes.statusCode || 200, headers);
      outRes.end(body);
    });
  });

  // Proxy WebSocket upgrades (for HMR)
  server.on("upgrade", (req, socket, head) => {
    proxy.ws(req, socket, head);
  });

  proxy.on("error", (_err, _req, res) => {
    if (!upstreamDown) {
      upstreamDown = true;
      const client = getActiveClient();
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "devServerDisconnected" }));
      }
    }
    if (res && "writeHead" in res) {
      const errRes = res as unknown as http.ServerResponse;
      errRes.writeHead(502, { "Content-Type": "text/plain" });
      errRes.end("Dev server unavailable");
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
