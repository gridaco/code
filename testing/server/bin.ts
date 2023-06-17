// cli for booting up testing local server

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { start, ServerOptions, defaultOptions } from "./server";

const argv = yargs(hideBin(process.argv))
  .option("port", {
    alias: "p",
    description: "The port to bind the server to",
    type: "number",
    default: defaultOptions.port,
  })
  .option("reports", {
    description: "The path to the folder with the files",
    type: "string",
    default: defaultOptions.reports,
  })
  .help()
  .alias("help", "h").argv as ServerOptions;

if (require.main === module) {
  start({ port: argv.port, reports: argv.reports });
}
