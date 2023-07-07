const github = require("@actions/github");
const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
const context = github.context;
const { sha } = context;

const report_url = `https://code.grida.co/tests/reports/${sha}`;

let message;

if (context.payload.pull_request && context.eventName === "pull_request") {
  const conclusion = process.env.STATUS || "unknown";

  switch (conclusion) {
    case "success":
      message = `Report available at ${report_url} :tada:`;
      break;
    case "failure":
      message = "Your PR failed some tests :x:";
      break;
    case "skipped":
    case "unknown":
      break;
  }

  // add a comment to the PR
  octokit.issues.createComment({
    ...context.repo,
    issue_number: context.payload.pull_request.number,
    body: message,
  });
}
