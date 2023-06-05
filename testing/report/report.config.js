const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const { OUTDIR, LOCAL_ARCHIVE_FILES, LOCAL_ARCHIVE_IMAGES } = process.env;

module.exports = {
  sample: path.join(__dirname, "../../data/figma-archives/prod/meta.json"),
  outDir: OUTDIR,
  localarchive: {
    files: LOCAL_ARCHIVE_FILES,
    images: LOCAL_ARCHIVE_IMAGES,
  },
  skipIfReportExists: true,
};
