// cli for report generation

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import path from "path";
import { report, GenerateReportOptions } from "./report";

const argv = yargs(hideBin(process.argv))
  .option("port", {
    alias: "p",
    description: "The local fs server port",
    type: "number",
    default: 8000,
  })
  .option("config", {
    description: "The path to the reports.config.js file",
    type: "string",
    default: path.join(process.cwd(), "report.config.js"),
  })
  .help()
  .alias("help", "h").argv as GenerateReportOptions;

if (require.main === module) {
  report({ port: argv.port, config: argv.config });
}
