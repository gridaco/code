const path = require("path");
const child_process = require("child_process");

const DIR_TESTING = path.join(__dirname, "..", "..", "testing");
const DIR_TESTING_REPORT = path.join(DIR_TESTING, "report");
const CONFIG_FILE = path.join(__dirname, "report.config.js");

// run the report ci
child_process
  .spawn(`npm run report --`, ["--config", CONFIG_FILE], {
    shell: true,
    cwd: DIR_TESTING_REPORT,
  })
  .stdout.on("data", (data) => {
    console.log(`${data}`);
  })
  .on("error", (err) => {
    console.info(err);
    process.exit(1);
  })
  .on("exit", (code) => {
    process.exit(code);
  });
