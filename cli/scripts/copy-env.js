// copy local .public-credentials under /dist after bundling
// see package.json#scripts#copy-env

const fs = require("fs-extra");
const path = require("path");

const dist = path.resolve(__dirname, "../dist");

function sync_target(target) {
  const to = path.resolve(__dirname, `../${target}`);
  const tt = path.resolve(dist, target);
  // make (e.g. .public-credentials) dir under dist
  fs.mkdirSync(path.resolve(dist, target));
  // copy entire (e.g. public-credentials) folder to dist
  fs.copySync(to, tt);
  // ensure .env exists in dist
  fs.ensureFileSync(path.resolve(tt, ".env"));
}
const _public_credentials = ".public-credentials";
const _runtime_env = ".runtime-env";

try {
  sync_target(_public_credentials);
  sync_target(_runtime_env);
} catch (e) {
  console.error(
    "Oops. you cannot run copy-env unless you are maintainer of this project."
  );
  throw e;
}
