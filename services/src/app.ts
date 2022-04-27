import * as express from "express";
import * as useragent from "express-useragent";

const app = express();

app.use(useragent.express());

export { app };
