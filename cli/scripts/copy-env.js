// copy local .public-credentials under /dist after bundling
// see package.json#scripts#copy-env

const fs = require("fs-extra");
const path = require("path");

const dist = path.resolve(__dirname, "../dist");
const publicCredentials = path.resolve(__dirname, "../.public-credentials");
const distPublicCredentials = path.resolve(dist, ".public-credentials");

// make .public-credentials dir under dist
fs.mkdirSync(path.resolve(dist, ".public-credentials"));

// copy entire public-credentials folder to dist
fs.copySync(publicCredentials, distPublicCredentials);

// ensure .env exists in dist
try {
  fs.ensureFileSync(path.resolve(distPublicCredentials, ".env"));
} catch (e) {
  console.error(
    "Oops. you cannot run copy-env unless you are maintainer of this project."
  );
  throw e;
}
