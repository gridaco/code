import { locatePubspec } from "../index";
import path from "path";
test("find grida project cwd", () => {
  const _ = locatePubspec(path.join(__dirname, "sub-dir-for-testing"));
  expect(_.manifest.name).toBe("pubtest");
});
