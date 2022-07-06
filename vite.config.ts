import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { svgstore } from "./src/vite_plugins/svgstore";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    svgstore(),
  ],
});
