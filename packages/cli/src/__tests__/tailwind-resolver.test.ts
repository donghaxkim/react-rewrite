import { describe, it, expect, vi, beforeEach } from "vitest";
import { resolveTailwindConfig, parseThemeBlock } from "../tailwind-resolver.js";

describe("parseThemeBlock", () => {
  it("extracts CSS custom properties from @theme block", () => {
    const css = `
      @theme {
        --color-brand: #1a2b3c;
        --spacing-18: 4.5rem;
      }
    `;
    const result = parseThemeBlock(css);
    expect(result).toEqual({
      "--color-brand": "#1a2b3c",
      "--spacing-18": "4.5rem",
    });
  });

  it("returns empty object when no @theme block", () => {
    const css = `body { margin: 0; }`;
    expect(parseThemeBlock(css)).toEqual({});
  });

  it("handles multiple @theme blocks", () => {
    const css = `
      @theme {
        --color-a: red;
      }
      @theme {
        --color-b: blue;
      }
    `;
    const result = parseThemeBlock(css);
    expect(result["--color-a"]).toBe("red");
    expect(result["--color-b"]).toBe("blue");
  });
});
