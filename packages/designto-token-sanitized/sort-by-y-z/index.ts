type XYItem = { x: number; y: number };

/**
 * sorts item by y position, then x if y is equal
 * @param items
 * @returns
 */
export function sortbyYX<T extends XYItem = XYItem>(items: Array<T>): Array<T> {
  return items.sort(byYX);
}

export const byYX = (a: XYItem, b: XYItem) => {
  if (a.y !== b.y) {
    return a.y - b.y;
  }
  return a.x - b.x;
};

export const byY = (a: XYItem, b: XYItem) => {
  return a.y - b.y;
};
