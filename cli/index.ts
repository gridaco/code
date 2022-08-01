import cli from "./bin";
export type { GridaConfig } from "./config";

process.on("SIGINT", () => {
  process.exit(0); // now the "exit" event will fire
});

// if main
if (require.main === module) {
  cli();
}
