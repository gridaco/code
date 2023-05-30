import path from "path";
import { ssim } from "./modules";

const demodir = path.join(__dirname, "../samples/demo");
const a = path.join(demodir, "a.png");
const b = path.join(demodir, "b.png");
const o = demodir;

ssim(a, b, o).then(console.log);
