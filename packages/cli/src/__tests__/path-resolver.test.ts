import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { isProjectFilePathSafe, resolveProjectFilePath } from "../path-resolver.js";

const tempRoots: string[] = [];

function makeProject(): string {
  const projectRoot = fs.mkdtempSync(path.join(os.tmpdir(), "react-rewrite-paths-"));
  tempRoots.push(projectRoot);
  return projectRoot;
}

afterEach(() => {
  while (tempRoots.length > 0) {
    const projectRoot = tempRoots.pop();
    if (projectRoot) {
      fs.rmSync(projectRoot, { recursive: true, force: true });
    }
  }
});

describe("resolveProjectFilePath", () => {
  it("resolves project-relative paths inside the project root", () => {
    const projectRoot = makeProject();

    expect(resolveProjectFilePath("src/Navbar.jsx", projectRoot)).toBe(
      path.join(projectRoot, "src", "Navbar.jsx"),
    );
  });

  it("treats leading-slash source paths as project-root-relative when no real absolute file exists", () => {
    const projectRoot = makeProject();

    expect(resolveProjectFilePath("/src/Navbar.jsx", projectRoot)).toBe(
      path.join(projectRoot, "src", "Navbar.jsx"),
    );
    expect(resolveProjectFilePath("/app/page.tsx", projectRoot)).toBe(
      path.join(projectRoot, "app", "page.tsx"),
    );
    expect(resolveProjectFilePath("/components/Button.tsx", projectRoot)).toBe(
      path.join(projectRoot, "components", "Button.tsx"),
    );
  });

  it("keeps true absolute paths that are already inside the project root", () => {
    const projectRoot = makeProject();
    const absolutePath = path.join(projectRoot, "features", "Hero.tsx");

    expect(resolveProjectFilePath(absolutePath, projectRoot)).toBe(absolutePath);
  });

  it("rejects traversal outside the project root", () => {
    const projectRoot = makeProject();

    expect(resolveProjectFilePath("../outside.tsx", projectRoot)).toBeNull();
    expect(isProjectFilePathSafe("../outside.tsx", projectRoot)).toBe(false);
  });

  it("rejects real absolute filesystem paths outside the project root", () => {
    const projectRoot = makeProject();
    const outsideDir = fs.mkdtempSync(path.join(os.tmpdir(), "react-rewrite-outside-"));
    tempRoots.push(outsideDir);
    const outsideFile = path.join(outsideDir, "Navbar.jsx");
    fs.writeFileSync(outsideFile, "export default function Navbar() { return null; }", "utf-8");

    expect(resolveProjectFilePath(outsideFile, projectRoot)).toBeNull();
    expect(isProjectFilePathSafe(outsideFile, projectRoot)).toBe(false);
  });
});
