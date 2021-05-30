export type SingleOrArray<T> = Array<T> | T;

/**
 * checks if `SingleOrArray<T>` is array
 * @param obj
 * @returns
 */
export function isArray<T = any>(obj: SingleOrArray<T>): boolean {
  return Array.isArray(obj);
}

/**
 * checks if input is array and not empty (> 0)
 * @param obj
 * @returns
 */
export function isNotEmptyArray<T = any>(obj: SingleOrArray<T>): boolean {
  return Array.isArray(obj) && obj.length > 0;
}

/**
 * maps the `SingleOrArray<T>` regarding less if it is array or not.
 * @param obj
 * @param map
 * @returns
 */
export function mapAsArray<T = any, U = any>(
  obj: SingleOrArray<T>,
  map: (value: T, index: number, array: T[]) => U
): Array<U> {
  if (isArray(obj)) {
    const arr = obj as Array<T>;
    return arr.map(map);
  } else {
    const single = obj as T;
    return [map(single, 0, [single])];
  }
}
