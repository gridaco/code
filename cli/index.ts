#!/usr/bin/env node

import cli from "./bin";
import chalk from "chalk";
export type { GridaConfig } from "./config";

process
  .on("SIGINT", () => {
    process.exit(0); // now the "exit" event will fire
  })
  .on("uncaughtException", (err) => {
    console.log(chalk.bgRed(err.message ?? ""));
    process.exit(1);
  })
  .on("unhandledRejection", (err: Error, p) => {
    console.error(chalk.bgRed(err.message ?? ""));
    process.exit(1);
  });

// if main
if (require.main === module) {
  cli();
}
