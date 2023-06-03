import express from "express";
import { Worker } from "@codetest/screenshot";

const worker = new Worker({});

const router = express.Router();

router.post("/htmlcss", async (req, res) => {
  // create screenshot from html and css
  await worker.launch();
  const buffer = await worker.screenshot(req.body);

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": buffer.length,

    // prevent caching
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  });

  res.end(buffer);
});

export default router;
