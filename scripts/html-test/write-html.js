// get txt file as cli input, write to out.html file (to remove the special characters like \n, \t, etc)

const fs = require("fs");
const path = require("path");

const input = process.argv[2];
let txt = fs.readFileSync(path.join(__dirname, input), "utf8");

// remove special characters
txt = txt.replace(/\\n/g, "\n");
txt = txt.replace(/\\t/g, "\t");
txt = txt.replace(/\\r/g, "\r");
txt = txt.replace(/\\"/g, '"');

fs.writeFileSync(path.join(__dirname, "out.html"), txt);
