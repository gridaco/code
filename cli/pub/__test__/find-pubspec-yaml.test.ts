import { locatePubspec } from "../index";
import path from "path";
test("find pub project in sub", () => {
  const _ = locatePubspec(path.join(__dirname, "sub-dir-for-testing"));
  expect(_.manifest.name).toBe("pubtest");
});

test("find pub project in root", () => {
  const _ = locatePubspec(__dirname);
  expect(_.manifest.name).toBe("pubtest");
});
