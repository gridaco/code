import { locateGridaProject, read } from "../index";
import path from "path";

test("find grida project cwd", () => {
  const _ = locateGridaProject(__dirname);
  expect(_?.config_file).toBe(path.join(__dirname, "grida.config.js"));
});

test("find grida project from subdir", () => {
  const _ = locateGridaProject(path.join(__dirname, "sub-dir-for-testing"));
  expect(_?.config_file).toBe(path.join(__dirname, "grida.config.js"));
});

test("find grida project from subdir (deep)", () => {
  const _ = locateGridaProject(
    path.join(__dirname, "sub-dir-for-testing", "another-nested-dir")
  );
  expect(_?.config_file).toBe(path.join(__dirname, "grida.config.js"));
});

test("read config", () => {
  const _ = locateGridaProject(
    path.join(__dirname, "sub-dir-for-testing", "another-nested-dir")
  );
  expect(read(_?.config_file).name).toBe("__test__");
});
