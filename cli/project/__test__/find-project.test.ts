import { locateProject, read } from "../index";
import path from "path";

test("find grida project cwd", () => {
  const _ = locateProject(__dirname);
  expect(_?.config_file).toBe(path.join(__dirname, "grida.config.js"));
});

test("find grida project from subdir", () => {
  const _ = locateProject(path.join(__dirname, "sub-dir-for-testing"));
  expect(_?.config_file).toBe(path.join(__dirname, "grida.config.js"));
});

test("find grida project from subdir (deep)", () => {
  const _ = locateProject(
    path.join(__dirname, "sub-dir-for-testing", "another-nested-dir")
  );
  expect(_?.config_file).toBe(path.join(__dirname, "grida.config.js"));
});

test("read config", () => {
  const _ = locateProject(
    path.join(__dirname, "sub-dir-for-testing", "another-nested-dir")
  );
  expect(read(_?.config_file).name).toBe("__test__");
});
