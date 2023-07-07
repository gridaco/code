const path = require("path");

module.exports = {
  sample: path.join(__dirname, "samples-10.json"),
  outDir: path.join(__dirname, ".coverage"),
  skipIfReportExists: false,
};
