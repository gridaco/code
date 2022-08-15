#!/usr/bin/env node

import cli from "./bin";
import chalk from "chalk";
export type { GridaConfig } from "./config";
import dotenv from "dotenv";
import path from "path";

// process
//   .on("SIGINT", () => {
//     process.exit(0); // now the "exit" event will fire
//   })
//   .on("uncaughtException", (err) => {
//     console.log(chalk.bgRed(err.message ?? err));
//     process.exit(1);
//   })
//   .on("unhandledRejection", (err: Error, p) => {
//     console.error(chalk.bgRed(err.message ?? err));
//     process.exit(1);
//   });

// if main
if (require.main === module) {
  // load env for accessing grida services
  dotenv.config({
    path: path.join(__dirname, ".public-credentials", ".env"),
  });

  cli();
}
