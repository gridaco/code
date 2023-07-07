const path = require("path");

module.exports = {
  sample: path.join(__dirname, "samples-50.json"),
  outDir: path.join(__dirname, ".coverage"),
  skipIfReportExists: false,
};
