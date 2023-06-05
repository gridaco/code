const env = require("dotenv").config();

const { OUTDIR, LOCAL_ARCHIVE_FILE, LOCAL_ARCHIVE_IMAGE } = env;

module.exports = {
  sample: "../../data/figma-archives/dev/meta.json",
  outDir: OUTDIR,
  localarchive: {
    file: LOCAL_ARCHIVE_FILE,
    image: LOCAL_ARCHIVE_IMAGE,
  },
  skipIfReportExists: true,
};
