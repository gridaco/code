import { locateBaseProject } from "../index";
import path from "path";

test("find base project root", () => {
  const _ = locateBaseProject(__dirname);
  expect(_?.config_file).toBe(path.join(__dirname, "package.json"));
});
