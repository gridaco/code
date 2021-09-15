export function px(d: number): string | undefined {
  if (d === undefined) {
    return;
  } else {
    // making to fixed number since css does not support decimal px points.
    return `${d.toFixed()}px`;
  }
}
