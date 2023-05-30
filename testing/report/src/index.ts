import parseArgs from "minimist";
import path from "path";
import { promises as fs, existsSync as exists } from "fs";

const args = parseArgs(process.argv.slice(2));

function report() {
  // create .coverage folder
  const coverage_path = path.join(process.cwd(), ".coverage");
  if (!exists(coverage_path)) {
    fs.mkdir(coverage_path);
  }
}

if (require.main === module) {
  report();
}
