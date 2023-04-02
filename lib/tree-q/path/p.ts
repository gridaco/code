interface Item {
  id: string;
  children: Item[];
}

/**
 * Returns the contains data as path array.
 *
 * @example
 * { id: '1', children: [{ id: '2', children: [{ id: '3', children: [] }] }] }
 * contains('3', { data: { id: '1', children: [{ id: '2', children: [{ id: '3', children: [] }] }] } })
 * // => ['1', '2', '3']
 *
 * If the id is not found, returns an empty array.
 *
 * @param id
 * @param data
 * @returns
 */
function p<T extends Item = Item>(id: string, { data }: { data: T }): string[] {
  let path: string[] = [];

  function search(node: T, currentPath: string[]): boolean {
    if (node.id === id) {
      path = [...currentPath, node.id];
      return true;
    }

    if (!node.children) {
      return false;
    }

    for (const child of node.children) {
      const found = search(child as T, [...currentPath, node.id]);
      if (found) {
        return true;
      }
    }
    return false;
  }

  search(data, []);
  return path;
}

export { p };
