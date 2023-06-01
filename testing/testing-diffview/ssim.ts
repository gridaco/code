import path from "path";
import Axios from "axios";

const cvclient = Axios.create({
  baseURL: "http://localhost:5000",
});

interface SSIMResult {
  diff: string;
  score: number;
}

export async function ssim(a, b, o) {
  const { data: result } = await cvclient.post<SSIMResult>("/ssim", {
    a,
    b,
    o,
  });

  // the files are under the out directory
  const diff = path.join(o, result.diff);

  return {
    ...result,
    diff,
  };
}
