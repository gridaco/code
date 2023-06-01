import express from "express";
import path from "path";
import { ssim } from "@codetest/diffview";

const app = express();

app.listen(3000, () => {
  console.log("listening on port 3000");
});

const demodir = path.join(__dirname, "../samples/demo");
const a = path.join(demodir, "a.png");
const b = path.join(demodir, "b.png");
const o = demodir;

ssim(a, b, o).then(console.log);
