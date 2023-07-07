const github = require("@actions/github");
const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
const context = github.context;

const STEP = "test";

let message;

if (context.payload.pull_request && context.eventName === "pull_request") {
  const conclusion = steps[STEP].conclusion;

  switch (conclusion) {
    case "success":
      message = "Your PR passed all tests :tada:";
      break;
    case "failure":
      message = "Your PR failed some tests :x:";
      break;
    case "skipped":
      break;
  }

  // add a comment to the PR
  await octokit.issues.createComment({
    ...context.repo,
    issue_number: context.payload.pull_request.number,
    body: message,
  });
}
