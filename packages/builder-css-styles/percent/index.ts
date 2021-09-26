export function percent(p: number | `${number}%`) {
  if (typeof p === "number") {
    return `${p}%`;
  }
  if (p.endsWith("%")) {
    return `${parseFloat(p).toFixed()}%`;
  }
  throw new Error(`Invalid percent value: ${p}`);
}
