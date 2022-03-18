const path = require("path");
const fse = require("fs-extra");

const origin = path.join(__dirname, "../../packages/support-flags/docs");
const target = path.join(__dirname, "../../docs/flags");

async function main() {
  await fse.copy(origin, target, { overwrite: true });
}

if (require.main === module) {
  main();
}
