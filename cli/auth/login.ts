import {
  isAuthenticated,
  startAuthenticationSession,
  checkAuthSession,
} from "./api";
import open from "open";
import { exit } from "process";
import { prompt } from "enquirer";
import ora from "ora";
import chalk from "chalk";

export async function login() {
  const _spnr_check_auth = ora("Verifing...").start();
  if (await isAuthenticated()) {
    _spnr_check_auth.succeed("You are already logged in.");
    exit(0);
  } else {
    _spnr_check_auth.stop();
  }

  //
  let session;
  let url;
  try {
    const { authUrl, id: _session } = await startAuthenticationSession();
    session = _session;
    url = authUrl;
    await open(authUrl);
  } catch (e) {
    exit(1);
  }

  //
  await prompt({
    name: "continue",
    message:
      "Press enter after you have completed authentication on your browser.",
    type: "input",
    initial: "Continue",
    format(value) {
      return "";
    },
    // @ts-ignore
    async validate() {
      try {
        return await checkAuthSession(session);
      } catch (e) {
        return "Seems like you are not logged in. Please try again - " + url;
      }
    },
  });

  console.log(chalk.green("✔️") + " Logged in.");

  return;
}
