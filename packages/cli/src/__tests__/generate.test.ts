import { describe, it, expect } from "vitest";
import { parseDiffResponse } from "../generate.js";

describe("parseDiffResponse", () => {
  it("parses SEARCH/REPLACE with LINES directive", () => {
    const response = `FILE: src/App.tsx
LINES: 5-7
<<<<<<< SEARCH
<Button className="px-2">
=======
<Button className="px-6">
>>>>>>> REPLACE
DESCRIPTION: src/App.tsx
Updated padding.`;

    const changes = parseDiffResponse(response);
    expect(changes).toHaveLength(1);
    expect(changes[0].filePath).toBe("src/App.tsx");
    expect(changes[0].replacements).toHaveLength(1);
    expect(changes[0].replacements[0].search).toBe('<Button className="px-2">');
    expect(changes[0].replacements[0].replace).toBe('<Button className="px-6">');
    expect(changes[0].replacements[0].lines).toEqual({ start: 5, end: 7 });
  });

  it("parses multiple SEARCH/REPLACE blocks with different LINES", () => {
    const response = `FILE: src/App.tsx
LINES: 5-7
<<<<<<< SEARCH
<Button className="px-2">
=======
<Button className="px-6">
>>>>>>> REPLACE
LINES: 12-14
<<<<<<< SEARCH
<Card className="mt-2">
=======
<Card className="mt-4">
>>>>>>> REPLACE
DESCRIPTION: src/App.tsx
Updated spacing.`;

    const changes = parseDiffResponse(response);
    expect(changes).toHaveLength(1);
    expect(changes[0].replacements).toHaveLength(2);
    expect(changes[0].replacements[0].lines).toEqual({ start: 5, end: 7 });
    expect(changes[0].replacements[1].lines).toEqual({ start: 12, end: 14 });
  });

  it("fallback: parses SEARCH/REPLACE without LINES directive", () => {
    const response = `FILE: src/App.tsx
<<<<<<< SEARCH
<Button className="px-2">
=======
<Button className="px-6">
>>>>>>> REPLACE
DESCRIPTION: src/App.tsx
Updated padding.`;

    const changes = parseDiffResponse(response);
    expect(changes).toHaveLength(1);
    expect(changes[0].replacements).toHaveLength(1);
    expect(changes[0].replacements[0].search).toBe('<Button className="px-2">');
    expect(changes[0].replacements[0].replace).toBe('<Button className="px-6">');
    expect(changes[0].replacements[0].lines).toBeUndefined();
  });

  it("returns empty array for empty response", () => {
    expect(parseDiffResponse("")).toEqual([]);
  });

  it("returns empty array for response with only DESCRIPTION", () => {
    const response = `DESCRIPTION: src/App.tsx
No changes needed.`;
    expect(parseDiffResponse(response)).toEqual([]);
  });

  it("merges replacements when same file appears in two FILE sections", () => {
    const response = `FILE: src/App.tsx
LINES: 5-7
<<<<<<< SEARCH
<Button>A</Button>
=======
<Button>B</Button>
>>>>>>> REPLACE
FILE: src/App.tsx
LINES: 20-22
<<<<<<< SEARCH
<Card>X</Card>
=======
<Card>Y</Card>
>>>>>>> REPLACE`;

    const changes = parseDiffResponse(response);
    expect(changes).toHaveLength(1);
    expect(changes[0].filePath).toBe("src/App.tsx");
    expect(changes[0].replacements).toHaveLength(2);
    expect(changes[0].replacements[0].lines).toEqual({ start: 5, end: 7 });
    expect(changes[0].replacements[1].lines).toEqual({ start: 20, end: 22 });
  });
});
