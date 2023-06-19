const path = require("path");

module.exports = {
  sample: path.join(__dirname, "sample.json"),
  outDir: path.join(__dirname, ".coverage"),
  skipIfReportExists: false,
};
