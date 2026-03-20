import * as net from "node:net";

export async function getAvailablePort(preferred: number): Promise<number> {
  let port = preferred;
  while (port < preferred + 100) {
    const available = await new Promise<boolean>((resolve) => {
      const server = net.createServer();
      server.once("error", () => resolve(false));
      server.once("listening", () => {
        server.close();
        resolve(true);
      });
      server.listen(port);
    });
    if (available) return port;
    port++;
  }
  throw new Error(
    `No available port found in range ${preferred}-${preferred + 99}`
  );
}

export function detectQuoteStyle(source: string): "single" | "double" {
  // Only count quotes in import/require statements to avoid JSX attribute bias
  const importLines = source.split("\n").filter(
    (line) => line.includes("import ") || line.includes("require(")
  );
  const importText = importLines.join("\n");
  const singleCount = (importText.match(/'/g) || []).length;
  const doubleCount = (importText.match(/"/g) || []).length;
  // Fall back to double if no imports found (safe default for most projects)
  return singleCount > doubleCount ? "single" : "double";
}
