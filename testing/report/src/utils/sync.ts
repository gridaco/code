import fs from "fs/promises";
import { exists } from "./exists";
import axios from "axios";

/**
 * download the 'a' with url
 * if 'a' is local fs path, then use symlink instead
 * @param a
 * @param b
 */
export async function sync(a: string, b: string) {
  if (await exists(a)) {
    try {
      // Check if b exists and remove
      try {
        await fs.lstat(b); // use stat to check if file exists (even broken one)
        await fs.unlink(b);
      } catch (e) {
        // Handle file not found error
        if (e.code !== "ENOENT") {
          throw e;
        }
      }

      await fs.symlink(a, b);
    } catch (e) {
      // TODO: symlink still fails with "EEXIST: file already exists, symlink"
      // we need to handle this.
      // reason? - unknown
    }
  } else if (a.startsWith("http")) {
    const dl = await axios.get(a, { responseType: "arraybuffer" });
    await fs.writeFile(b, dl.data);
  } else {
    throw new Error(`File not found - ${a}`);
  }
}
