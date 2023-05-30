import path from "path";
import { run } from "./python-shell";

interface SSIMResult {
  diff: string;
}

export async function ssim(a: string, b: string, o: string) {
  const result = await run<SSIMResult>("ssim.py", {
    "--a": a,
    "--b": b,
    "--o": o,
  });

  // the files are under the out directory
  const diff = path.join(o, result.diff);

  return {
    ...result,
    diff,
  };
}
