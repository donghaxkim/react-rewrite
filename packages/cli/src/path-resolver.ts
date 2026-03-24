import * as fs from "node:fs";
import * as path from "node:path";

function isWithinProjectRoot(resolvedPath: string, projectRoot: string): boolean {
  return resolvedPath === projectRoot || resolvedPath.startsWith(projectRoot + path.sep);
}

/**
 * Canonicalize an incoming file path from the overlay into an absolute path
 * inside the project root.
 *
 * Supported inputs:
 * - `src/App.tsx` -> `<projectRoot>/src/App.tsx`
 * - `/src/App.tsx` -> `<projectRoot>/src/App.tsx`
 * - `/abs/path/in/project/src/App.tsx` -> same absolute path
 *
 * Rejected inputs:
 * - `../outside.tsx`
 * - `/etc/passwd`
 * - `/abs/path/outside/project/file.tsx`
 */
export function resolveProjectFilePath(filePath: string, projectRoot: string): string | null {
  const normalizedRoot = path.resolve(projectRoot);
  const incomingPath = filePath.trim();
  if (!incomingPath) return null;

  if (path.isAbsolute(incomingPath)) {
    const absoluteCandidate = path.resolve(incomingPath);
    if (isWithinProjectRoot(absoluteCandidate, normalizedRoot)) {
      return absoluteCandidate;
    }

    // If the absolute path exists outside the project, treat it as a real
    // filesystem absolute and reject it. Only reinterpret missing leading-slash
    // paths like "/src/App.tsx" as project-root-relative source paths.
    if (fs.existsSync(absoluteCandidate)) {
      return null;
    }

    const projectRelativeCandidate = path.resolve(
      normalizedRoot,
      incomingPath.replace(/^[/\\]+/, ""),
    );
    return isWithinProjectRoot(projectRelativeCandidate, normalizedRoot)
      ? projectRelativeCandidate
      : null;
  }

  const relativeCandidate = path.resolve(normalizedRoot, incomingPath);
  return isWithinProjectRoot(relativeCandidate, normalizedRoot)
    ? relativeCandidate
    : null;
}

export function isProjectFilePathSafe(filePath: string, projectRoot: string): boolean {
  return resolveProjectFilePath(filePath, projectRoot) !== null;
}
