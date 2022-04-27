import * as express from "express";
import * as useragent from "express-useragent";

const app = express();

app.get("/", (req, res) => {
  res.send("service is running");
});
app.use(useragent.express());

export { app };
