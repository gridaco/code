///
/// oriented from - https://github.com/yoshuawuyts/npm-install-package (MIT LICENSE)
/// updated by universe (MIT)
///

import { Dependency } from "./type";
import util from "util";

const exec = util.promisify(require("child_process").exec);

export async function npmInsatll(
  cwd = process.cwd(),
  deps?: Dependency | Dependency[],
  opts?: {
    save?: boolean;
    saveDev?: boolean;
    global?: boolean;
    cache?: boolean;
    verbose?: boolean;
  }
) {
  deps = deps ? (Array.isArray(deps) ? deps : [deps]) : [];
  opts = opts ?? {};

  var args = [];
  if (opts.save) args.push("-S");
  if (opts.saveDev) args.push("-D");
  if (opts.global) args.push("-g");
  if (opts.cache) args.push("--cache-min Infinity");

  if (opts.verbose) {
    deps.forEach(function (dep) {
      process.stdout.write("pkg: " + dep.name + "\n");
    });
  }

  var cliArgs = ["npm i"]
    .concat(
      args,
      deps.map((d) => {
        if (d.version) {
          return d.name + "@" + d.version;
        } else {
          return d.name;
        }
      })
    )
    .join(" ");
  await exec(cliArgs, {
    cwd,
  });
}
