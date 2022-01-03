const path = require("path");
const fse = require("fs-extra");

const origin = path.join(__dirname, "../../packages/support-flags/docs");
const target = path.join(__dirname, "../../docs/flags");

if (require.main === module) {
  fse.copySync(origin, target, { overwrite: true }, function (err) {
    if (err) {
      console.error(err);
    } else {
    }
  });
}
