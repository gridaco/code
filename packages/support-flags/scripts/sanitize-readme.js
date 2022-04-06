///
/// this script does not create a new readme, it only replaces the existing one's content.
///

const fs = require("fs");
const path = require("path");

const _this_pkg_root = path.join(__dirname, "..");

function get_flags_readme_files() {
  const files = [];
  // read all directories under origin directory with pattern that matches regex `/^--[a-z]+(.*?)$/` as prefix
  // add README.md files to files array
  fs.readdirSync(_this_pkg_root).forEach((dir) => {
    if (dir.match(/^--[a-z]+(.*?)$/)) {
      const dirPath = path.join(_this_pkg_root, dir);
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
    const dirPath = path.join(_this_pkg_root, dir);
    const filesInDir = fs.readdirSync(dirPath);
    filesInDir.forEach((file) => {
      if (file === "README.md") {
        files.push(path.join(dirPath, file));
      }
    });
  });

  return files;
}

function generate_readme_all() {
  const files = get_flags_readme_files();
  const fileMap = new Map();
  files.forEach((file) => {
    // make a key. the key is extracted from var - file, which is a paht. extract last directory name and use it as key. e.g. "../../--action/README.md" -> "--action"
    const key = path.basename(path.dirname(file));
    const template = fs.readFileSync(
      path.join(__dirname, "../docs/__readme_template__.md"),
      "utf8"
    );
    fileMap.set(key, {
      content: template.replace(/{{flag}}/g, key),
    });
  });

  // update each readme.md
  fileMap.forEach((value, key) => {
    // const newFile = path.join(target, `${key}${value.ext}`);
    fs.writeFileSync(
      path.join(_this_pkg_root, key, "README.md"),
      value.content
    );
  });
}

generate_readme_all();
