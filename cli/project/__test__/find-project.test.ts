import { find_grida_project } from "../index";
import path from "path";

test("find grida project cwd", () => {
  const _ = find_grida_project(__dirname);
  expect(_?.config_file).toBe(path.join(__dirname, "grida.config.js"));
});

test("find grida project from subdir", () => {
  const _ = find_grida_project(path.join(__dirname, "sub-dir-for-testing"));
  expect(_?.config_file).toBe(path.join(__dirname, "grida.config.js"));
});

test("find grida project from subdir (deep)", () => {
  const _ = find_grida_project(
    path.join(__dirname, "sub-dir-for-testing", "another-nested-dir")
  );
  expect(_?.config_file).toBe(path.join(__dirname, "grida.config.js"));
});
