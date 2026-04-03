export function buildCanvasTransformMatrix(scale: number, offsetX: number, offsetY: number): string {
  return `matrix(${scale}, 0, 0, ${scale}, ${offsetX}, ${offsetY})`;
}

export function viewportToPageAtTransform(
  clientX: number,
  clientY: number,
  scale: number,
  offsetX: number,
  offsetY: number,
): { x: number; y: number } {
  return {
    x: (clientX - offsetX) / scale,
    y: (clientY - offsetY) / scale,
  };
}

export function pageToViewportAtTransform(
  pageX: number,
  pageY: number,
  scale: number,
  offsetX: number,
  offsetY: number,
): { x: number; y: number } {
  return {
    x: pageX * scale + offsetX,
    y: pageY * scale + offsetY,
  };
}
