import express from "express";
import fs from "fs/promises";
import path from "path";
import { globSync } from "glob";

const router = express.Router();

router.get("/", async (req, res) => {
  const reportsdir = req.app.get("reports");
  // list all available report coverage

  // list all directories under reportsdir
  const items = await fs.readdir(reportsdir);

  // filter items with valid report coverage
  // - must be a directory
  // - must contain at least one suv directory
  const files = await Promise.all(
    items.map(async (item) => {
      const p = path.join(reportsdir, item);
      const stat = await fs.stat(p);
      if (!stat.isDirectory()) {
        return null;
      }

      const nodes = await fs.readdir(p);
      if (nodes.length === 0) {
        return null;
      }

      return item;
    })
  );

  res.json({
    files: files.filter(Boolean),
  });
});

router.get("/:file", async (req, res) => {
  const server = res.locals.server;
  const reportsdir = req.app.get("reports");
  const file = req.params.file;

  // list reports under fileid
  const p = path.join(reportsdir, file);

  // each node directory (should be a directory) must contain report.json
  // use glob to find all report.json, list the parent directory (the node directory)
  const data = globSync(`${p}/**/report.json`).reduce((acc, cur) => {
    const dir = path.dirname(cur);
    const nodeid = path.basename(path.dirname(cur));
    return {
      ...acc,
      [nodeid]: {
        report: server + `/public/reports/${file}/${nodeid}/report.json`,
        a: server + `/public/reports/${file}/${nodeid}/a.png`,
        b: server + `/public/reports/${file}/${nodeid}/b.png`,
        diff: server + `/public/reports/${file}/${nodeid}/diff.png`,
      },
    };
  }, {});

  res.json(data);
});

router.get("/:file/:node", async (req, res) => {
  const server = res.locals.server;
  const reportsdir = req.app.get("reports");
  const file = req.params.file;
  const nodeid = req.params.node;
  //
  const p = path.join(reportsdir, file, nodeid);

  // check if directory exists
  // if not, return 404
  const stat = await fs.stat(p);
  if (!stat.isDirectory()) {
    res.status(404).send("not found");
    return;
  }

  // check if valid report.json exists
  // if not, return 404
  const report = path.join(p, "report.json");
  try {
    await fs.access(report);
  } catch (e) {
    res.status(404).send("not found");
    return;
  }

  res.json({
    report: server + `/public/reports/${file}/${nodeid}/report.json`,
    a: server + `/public/reports/${file}/${nodeid}/a.png`,
    b: server + `/public/reports/${file}/${nodeid}/b.png`,
    diff: server + `/public/reports/${file}/${nodeid}/diff.png`,
  });
});

export default router;
