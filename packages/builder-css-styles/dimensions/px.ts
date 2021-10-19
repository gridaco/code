export function px(d: number): string | undefined {
  if (d === undefined || d === null) {
    return;
  } else {
    // making to fixed number since css does not support decimal px points.
    // If there is a decimal point, it is rounded to the first place.
    return `${d.toFixed()}px`;
  }
}
