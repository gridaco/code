import { locateNodePackage } from "../index";
import path from "path";
test("find node project in sub", () => {
  const _ = locateNodePackage(path.join(__dirname, "sub-dir-for-testing"));
  expect(_.manifest.name).toBe("npmtest");
});

test("find node project in root", () => {
  const _ = locateNodePackage(__dirname);
  expect(_.manifest.name).toBe("npmtest");
});
