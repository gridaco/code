const path = require("path");
const child_process = require("child_process");
const core = require("@actions/core");
const github = require("@actions/github");

const context = github.context;

let releaseName, releaseVersion, pullRequestNumber;

if (context.eventName === "release") {
  releaseName = context.payload.release.name;
  releaseVersion = context.payload.release.tag_name;
} else if (context.eventName === "pull_request") {
  pullRequestNumber = context.payload.pull_request.number;
}

/**
 * get the report mode
 * max | med | min
 */
function get_report_mode() {
  if (context.eventName === "release") {
    return "max";
  } else if (context.eventName === "pull_request") {
    if (
      context.payload.action === "opened" ||
      context.payload.pull_request.merged
    ) {
      return "med";
    } else if (context.payload.action === "synchronize") {
      return "min";
    }
  }
}

const mode = get_report_mode();

const DIR_TESTING = path.join(__dirname, "..", "..", "testing");
const DIR_TESTING_REPORT = path.join(DIR_TESTING, "report");
const CONFIG_FILE = path.join(__dirname, `configs/report.config.${mode}.js`);

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
