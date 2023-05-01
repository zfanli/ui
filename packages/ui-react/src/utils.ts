export function getCenter(element: HTMLElement): { x: number; y: number } {
  const rect = element.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  return { x: centerX, y: centerY }
}
