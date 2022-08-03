import { AuthStore } from "./store";
import chalk from "chalk";
export async function logout() {
  await AuthStore.clear();
  console.log(chalk.green("✔️") + " Logged out successfully.");
}
