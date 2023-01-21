/**
 * FSV's DS_Store
 * .fsv.ds_store
 *
 * @see
 *
 * - https://en.wikipedia.org/wiki/.DS_Store
 * - https://wiki.mozilla.org/DS_Store_File_Format
 */
export type FSVDSStore = {
  [key: string]: DSFileMeta;
};

type DSFileMeta = {
  /**
   * index in free-sort view
   */
  order: number;
  /**
   * position in gallery view
   */
  xy: [number, number];
  /**
   * z-index in gallery view
   */
  z: number;
};
