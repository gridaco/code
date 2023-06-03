import express from "express";
import path from "path";
import { ssim } from "@codetest/diffview";
import router_reports from "./reports";
import router_screenshots from "./screenshots";

const app = express();

app.get("/", (req, res) => {
  res.send("service is running");
});

app.use("/reports", router_reports);

app.use("/screenshots", router_screenshots);

app.listen(3000, () => {
  console.log("listening on port 3000");
});

const demodir = path.join(__dirname, "../samples/demo");
const a = path.join(demodir, "a.png");
const b = path.join(demodir, "b.png");
const o = demodir;

ssim(a, b, o).then(console.log);
