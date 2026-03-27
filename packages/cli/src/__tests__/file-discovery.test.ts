import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import { discoverFile } from "../file-discovery.js";

describe("discoverFile", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "react-rewrite-test-"));
    fs.mkdirSync(path.join(tmpDir, "src/components"), { recursive: true });
    fs.mkdirSync(path.join(tmpDir, "src/app"), { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("finds function declaration", async () => {
    fs.writeFileSync(
      path.join(tmpDir, "src/components/Button.tsx"),
      'export function Button() { return <button>Click</button>; }'
    );
    expect(await discoverFile("Button", tmpDir)).toBe("src/components/Button.tsx");
  });

  it("finds const arrow function", async () => {
    fs.writeFileSync(
      path.join(tmpDir, "src/components/Card.tsx"),
      'export const Card = () => <div>Card</div>;'
    );
    expect(await discoverFile("Card", tmpDir)).toBe("src/components/Card.tsx");
  });

  it("finds export default function", async () => {
    fs.writeFileSync(
      path.join(tmpDir, "src/app/page.tsx"),
      'export default function HomePage() { return <main>Home</main>; }'
    );
    expect(await discoverFile("HomePage", tmpDir)).toBe("src/app/page.tsx");
  });

  it("skips barrel files and finds real definition", async () => {
    fs.writeFileSync(
      path.join(tmpDir, "src/components/index.ts"),
      'export { CheckoutForm } from "./checkout-form";'
    );
    fs.writeFileSync(
      path.join(tmpDir, "src/components/checkout-form.tsx"),
      'export function CheckoutForm() { return <form>Checkout</form>; }'
    );
    expect(await discoverFile("CheckoutForm", tmpDir)).toBe("src/components/checkout-form.tsx");
  });

  it("follows re-export when only barrel file matches", async () => {
    fs.writeFileSync(
      path.join(tmpDir, "src/components/index.ts"),
      'export { NavBar } from "./nav-bar";'
    );
    fs.writeFileSync(
      path.join(tmpDir, "src/components/nav-bar.tsx"),
      'export function NavBar() { return <nav>Nav</nav>; }'
    );
    expect(await discoverFile("NavBar", tmpDir)).toBe("src/components/nav-bar.tsx");
  });

  it("prefers src/ files over root files", async () => {
    fs.writeFileSync(
      path.join(tmpDir, "Button.tsx"),
      'export function Button() { return <button/>; }'
    );
    fs.writeFileSync(
      path.join(tmpDir, "src/components/Button.tsx"),
      'export function Button() { return <button/>; }'
    );
    expect(await discoverFile("Button", tmpDir)).toBe("src/components/Button.tsx");
  });

  it("returns null for nonexistent component", async () => {
    expect(await discoverFile("DoesNotExist", tmpDir)).toBeNull();
  });

  it("ignores node_modules", async () => {
    fs.mkdirSync(path.join(tmpDir, "node_modules/some-lib"), { recursive: true });
    fs.writeFileSync(
      path.join(tmpDir, "node_modules/some-lib/Button.tsx"),
      'export function Button() { return <button/>; }'
    );
    expect(await discoverFile("Button", tmpDir)).toBeNull();
  });
});
