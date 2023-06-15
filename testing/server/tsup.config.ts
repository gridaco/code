import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["server.ts", "bin.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
});
