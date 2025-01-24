import path from "path";
import { add_dependencies } from "../insert";
import fs from "fs";
// max 30s
jest.setTimeout(30000);

test("add dependency to empty package.json (write only)", async () => {
  // copy (overwrite) file from template for testing
  const template = path.join(__dirname, "./package.empty.json");
  const target = path.join(__dirname, "./package.test.empty.json");
  fs.copyFileSync(template, target, fs.constants.COPYFILE_FICLONE);

  const { manifest: _manifest } = await add_dependencies(target, {
    dependencies: [
      { name: "@emotion/react", version: "latest" },
      { name: "@emotion/styled", version: "latest" },
    ],
    devDependencies: [{ name: "grida", version: "latest" }],
    type: "write-only",
  });
  const manifest = _manifest();
  expect(
    "@emotion/react" in manifest.dependencies &&
      "@emotion/styled" in manifest.dependencies &&
      "grida" in manifest.devDependencies
  ).toBe(true);

  // remove file after testing
  fs.unlinkSync(target);
});

test("add dependency to empty package.json (with install)", async () => {
  // copy file from template for testing
  const template = path.join(__dirname, "./package.empty.json");
  const target = path.join(
    __dirname,
    "sub-dir-for-npm-install",
    "package.json"
  );
  fs.copyFileSync(template, target, fs.constants.COPYFILE_FICLONE);

  const { manifest: _manifest, installed } = await add_dependencies(target, {
    dependencies: [
      { name: "@emotion/react", version: "latest" },
      { name: "@emotion/styled", version: "latest" },
    ],
    devDependencies: [{ name: "grida", version: "latest" }],
    type: "write-and-install",
    npmClient: "npm",
  });

  const manifest = _manifest();
  expect(
    "@emotion/react" in manifest.dependencies &&
      "@emotion/styled" in manifest.dependencies &&
      "grida" in manifest.devDependencies
  ).toBe(true);
  expect(installed).toBe(true);

  // remove file after testing
  fs.unlinkSync(target);
});

test("add dependency to fullfilled package.json (write only)", async () => {
  const { updated, installed } = await add_dependencies(
    path.join(__dirname, "./package.test.fulfilled.json"),
    {
      dependencies: [
        { name: "@emotion/react", version: "latest" },
        { name: "@emotion/styled", version: "latest" },
      ],
      devDependencies: [{ name: "grida", version: "latest" }],
      type: "write-only",
    }
  );

  expect(updated.dependencies.length).toBe(0);
  expect(updated.devDependencies.length).toBe(0);
  expect(installed).toBe(false);
});

// test("add dependency to fullfilled package.json (with install)", async () => {
//   // copy file from template for testing
//   const template = path.join(__dirname, "./package.test.fulfilled.json");
//   const target = path.join(
//     __dirname,
//     "sub-dir-for-npm-install",
//     "package.json"
//   );
//   fs.copyFileSync(template, target, fs.constants.COPYFILE_FICLONE);

//   const { updated, installed } = await add_dependencies(target, {
//     dependencies: [
//       { name: "@emotion/react", version: "latest" },
//       { name: "@emotion/styled", version: "latest" },
//     ],
//     devDependencies: [{ name: "grida", version: "latest" }],
//     type: "with-npm-client",
//     npmClient: "npm",
//   });

//   expect(updated.dependencies.length).toBe(0);
//   expect(updated.devDependencies.length).toBe(0);
//   expect(installed).toBe(false);

//   // remove file after testing
//   fs.unlinkSync(target);
// });
