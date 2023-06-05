import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  // list all available report coverage
});

router.get("/:fileid", (req, res) => {
  // list reports under fileid
  //
});

router.get("/:fileid/:node", (req, res) => {
  //
});

export default router;
