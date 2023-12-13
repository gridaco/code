import fs from "fs/promises";

export const exists = async (path: string) => {
  try {
    await fs.access(path);
    return true;
  } catch (e) {
    return false;
  }
};
