export function normalizeVisibleText(value: string): string {
  return value.replace(/\u00a0/g, " ");
}

export function getElementVisibleText(
  element: Pick<HTMLElement, "innerText" | "textContent">,
): string {
  const raw = typeof element.innerText === "string" ? element.innerText : (element.textContent ?? "");
  return normalizeVisibleText(raw);
}

export function getRangeVisibleText(range: Pick<Range, "toString">): string {
  return normalizeVisibleText(range.toString());
}
