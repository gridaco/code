
BASEDIR=$(dirname "$0")
cd "$BASEDIR/.." # scripts/
npm install
node ./docs-copy/flags-api-docs.js