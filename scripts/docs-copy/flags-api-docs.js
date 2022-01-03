const fs = require("fs");
const path = require("path");

const origin = path.join(__dirname, "../../packages/support-flags/docs");
const target = path.join(__dirname, "../../docs/flags");

/**
 * from https://stackoverflow.com/a/26038979/5463235
 */
function copyFileSync(source, target) {
  var targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

/**
 * from https://stackoverflow.com/a/26038979/5463235
 */
function copyFolderRecursiveSync(source, target, custom_name) {
  var files = [];

  // Check if folder needs to be created or integrated
  var targetFolder = path.join(target, custom_name);
  if (!fs.existsSync(targetFolder)) {
    throw `target folder does not exist - ${targetFolder}`;
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

if (require.main === module) {
  copyFolderRecursiveSync(origin, target, ".");
}
