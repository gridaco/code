export function fontFamily(...family: string[]): string {
  if (!family) {
    return;
  }

  return family
    .map((item) => {
      // if Helvetica Nueue, replace with "Helvetica Nueue"
      if (item.includes(" ")) {
        return `"${item}"`;
      }
      return item;
    })
    .join(", ");
}
