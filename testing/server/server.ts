import express from "express";
import path from "path";
import router_reports from "./reports";
import router_screenshots from "./screenshots";

export interface ServerOptions {
  /**
   * port number
   * @default 6627
   */
  port?: number;
  /**
   * reports artifect path
   */
  reports: string;
}

export const defaultOptions: ServerOptions = {
  port: 6627,
  reports: path.join(__dirname, "..", "report", ".coverage"),
};

export function start({
  port = defaultOptions.port,
  reports = defaultOptions.reports,
}: ServerOptions) {
  const app = express();

  // set env
  app.set("reports", reports);

  // set baseurl middleware
  app.use((req, res, next) => {
    res.locals.server = req.protocol + "://" + req.get("host");
    next();
  });

  // ping
  app.get("/", (req, res) => {
    res.send("service is running");
  });

  // reports
  app.use("/reports", router_reports);
  app.use("/public/reports", express.static(reports));

  // take screenshots
  app.use("/screenshots", router_screenshots);

  app.listen(port, () => {
    console.log(`listening on port ${port} => http://localhost:${port}`);
    console.log({
      port,
      reports,
    });
  });
}

if (require.main === module) {
  start(defaultOptions);
}
