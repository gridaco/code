const fs = require("fs");
const path = require("path");

const origin = "./packages/support-flags";
const target = "./docs/flags";
const github_base_url =
  "https://github.com/gridaco/designto-code/tree/main/packages/support-flags";
/**
 * copies the README.md file under each directory under "origin" to "target"
 * the README.md content will be preserved, but the file name will be changed to current folder name
 * for example, if the file is `--action/README.md`, the file will be copied and renamed to `--action.md`
 *
 * the origin directory will have multiple subdirectory with one README.md file.
 * these files under each subdirectory will be copied directly under "target" with above new file name.
 */
function copy() {
  const files = [];

  // read all directories under origin directory with pattern that matches regex `/^--[a-z]+(.*?)$/` as prefix
  // add README.md files to files array
  fs.readdirSync(origin).forEach((dir) => {
    if (dir.match(/^--[a-z]+(.*?)$/)) {
      const dirPath = path.join(origin, dir);
      const filesInDir = fs.readdirSync(dirPath);
      filesInDir.forEach((file) => {
        if (file === "README.md") {
          files.push(path.join(dirPath, file));
        }
      });
    }
  });

  // these are custom directories under origin. [`----disable`, `---custom`]
  // add README.md under these directory, add to files array
  ["----disable", "---custom"].forEach((dir) => {
    const dirPath = path.join(origin, dir);
    const filesInDir = fs.readdirSync(dirPath);
    filesInDir.forEach((file) => {
      if (file === "README.md") {
        files.push(path.join(dirPath, file));
      }
    });
  });

  // read the content and extension of each file, save it to a map. where key being the file path, value being the content and extension
  const fileMap = new Map();
  files.forEach((file) => {
    const content = fs.readFileSync(file, "utf8");
    const ext = path.extname(file);
    // make a key. the key is extracted from var - file, which is a paht. extract last directory name and use it as key. e.g. "../../--action/README.md" -> "--action"
    const key = path.basename(path.dirname(file));
    fileMap.set(key, { content, ext });
  });

  // copy each file to target directory
  fileMap.forEach((value, key) => {
    const newFile = path.join(target, `${key}${value.ext}`);
    fs.writeFileSync(newFile, value.content);
  });
}

if (require.main === module) {
  copy();
}
