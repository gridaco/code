import path from "path";
import { createServer } from "vite";

async function main({ root }: { root: string }) {
  const s = await createServer({
    configFile: false,
    root: root,
    base: "/s/",
    // server: {
    //   middlewareMode: true,
    // },
  });

  // file change
  s.watcher.on("change", (file) => {
    console.log("change", file);
  });

  s.listen();
}

const root = path.join(__dirname, "../demos/react");
console.log("running", root, "with vite");
main({
  root: root,
});
