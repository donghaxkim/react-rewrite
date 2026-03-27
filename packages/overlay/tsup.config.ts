import { defineConfig } from "tsup";

export default defineConfig({
  entry: { overlay: "src/index.ts" },
  format: ["iife"],
  globalName: "ReactRewrite",
  minify: true,
  outDir: "dist",
  platform: "browser",
  noExternal: [/.*/],
  outExtension() {
    return { js: ".js" };
  },
});
