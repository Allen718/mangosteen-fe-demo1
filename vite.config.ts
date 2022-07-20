import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { svgstore } from "./src/vite_plugins/svgstore";
import vueJsx from "@vitejs/plugin-vue-jsx";
import styleImport, { VantResolve } from "vite-plugin-style-import";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8088,
  },
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    svgstore(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
});
