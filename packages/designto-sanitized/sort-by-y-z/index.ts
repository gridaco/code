type XYItem = { x: number; y: number };

/**
 * sorts item by y position, then x if y is equal
 * @param items
 * @returns
 */
function sortbyXY<T extends XYItem = XYItem>(items: Array<T>): Array<T> {
  return items.sort((a, b) => {
    if (a.y !== b.y) {
      return a.y - b.y;
    }
    return a.x - b.x;
  });
}
