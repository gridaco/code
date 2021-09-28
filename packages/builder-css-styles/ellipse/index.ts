/**
 * @deprecated - not ready for dynamic use
 * @returns
 */
export function ellipse(
  x: number,
  y: number,
  width: number,
  height: number
): string {
  console.warn("you are using wip css method - ellipse.");
  return `ellipse(${width}px ${height}px at ${x}px ${y}px)`;
}
