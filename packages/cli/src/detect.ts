// packages/cli/src/detect.ts
import * as fs from "node:fs";
import * as path from "node:path";
import type { DetectionResult } from "@react-rewrite/shared";

export async function detect(cwd?: string): Promise<DetectionResult> {
  const projectRoot = cwd || process.cwd();

  // Check for React dependency
  const pkgJsonPath = path.join(projectRoot, "package.json");
  if (!fs.existsSync(pkgJsonPath)) {
    throw new Error(
      "No package.json found. Run react-rewrite from your project root."
    );
  }

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
  const allDeps = {
    ...pkgJson.dependencies,
    ...pkgJson.devDependencies,
  };

  if (!allDeps["react"]) {
    throw new Error(
      "React not found in dependencies. ReactRewrite requires a React project."
    );
  }

  // Check for development mode
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "ReactRewrite requires development mode. React Fiber debug info is not available in production builds."
    );
  }

  // Detect framework
  const nextConfigs = [
    "next.config.js",
    "next.config.ts",
    "next.config.mjs",
  ];
  const viteConfigs = ["vite.config.js", "vite.config.ts"];

  for (const config of nextConfigs) {
    if (fs.existsSync(path.join(projectRoot, config))) {
      return { framework: "nextjs", port: 3000, projectRoot };
    }
  }

  for (const config of viteConfigs) {
    if (fs.existsSync(path.join(projectRoot, config))) {
      return { framework: "vite", port: 5173, projectRoot };
    }
  }

  if (allDeps["react-scripts"]) {
    return { framework: "cra", port: 3000, projectRoot };
  }

  throw new Error(
    "Could not detect framework. ReactRewrite supports Next.js, Vite, and Create React App."
  );
}

export async function healthCheck(port: number, host: string = "localhost"): Promise<void> {
  const maxRetries = 3;
  const delay = 1000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(`http://${host}:${port}`, {
        signal: AbortSignal.timeout(2000),
      });
      if (response.ok || response.status < 500) return;
    } catch {
      // Connection refused or timeout
    }

    if (attempt < maxRetries) {
      await new Promise((r) => setTimeout(r, delay));
    }
  }

  throw new Error(
    `No dev server found on ${host}:${port}. Start your dev server first, then run react-rewrite.`
  );
}
