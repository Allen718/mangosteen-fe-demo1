import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { svgstore } from "./src/vite_plugins/svgstore";
import vueJsx from "@vitejs/plugin-vue-jsx";
import styleImport, { VantResolve } from "vite-plugin-style-import";
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8088,
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src')
    },
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

