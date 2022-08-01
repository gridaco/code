import { version, name } from "../version";
import boxen from "boxen";
import semver from "semver";
import fetch from "node-fetch";
import chalk from "chalk";

/**
 *
 */
export async function checkForUpdate() {
  // fetch latest version from npm
  const { version: latestVersion } = (await (
    await fetch(`https://registry.npmjs.org/${name}/latest`)
  ).json()) as { version: string };

  // compare versions
  if (semver.gt(latestVersion, version)) {
    // show update message
    console.log(makeUpdateMessage({ latest: latestVersion }));
  }
}

function makeUpdateMessage({ latest }: { latest: string }): string {
  return boxen(
    `${name} ${chalk.green(`v${latest}`)} is now available!
Run \`${chalk.green(`npm i -g ${name}`)}\` to update.`,
    { padding: 1, margin: 1, borderStyle: "classic" }
  );
}
