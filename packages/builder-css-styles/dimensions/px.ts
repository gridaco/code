export function px(d: number): string | undefined {
  if (d === undefined || d === null) {
    return;
  } else {
    // https://stackoverflow.com/questions/4308989/are-the-decimal-places-in-a-css-width-respected
    // making to fixed number since css does not support decimal px points.
    // If there is a decimal point, it is rounded to the first place.
    return `${Math.round(d)}px`;
    // return `${d.toFixed()}px`;
  }
}
