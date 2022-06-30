import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import pkg from "./package.json";
import path from "path";

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));

  return {
    resolve: {
      alias: {
        "@packages": path.resolve(__dirname, "packages"),
      },
    },
    css: { preprocessorOptions: { scss: { charset: false } } },
    build: {
      emptyOutDir: false,
      sourcemap: true,
      lib: {
        entry: "packages/index.ts",
        name: "QkFrontlib",
        formats: ["umd"],
        fileName: () => `${pkg.name}.min.js`,
      },
      rollupOptions: {
        external: [
          "vue",
          "vue-router",
          "element-plus",
          "axios",
          "dayjs",
          "vue-i18n",
        ],
        output: {
          assetFileNames: `${pkg.name}.min.css`,
          globals: {
            vue: "Vue",
            "element-plus": "element-plus",
            axios: "axios",
            dayjs: "dayjs",
          },
        },
      },
    },
    plugins: [vue()],
    define: {
      __UI_NAME__: JSON.stringify(pkg.name),
      __UI_VERSION__: JSON.stringify(pkg.version),
    },
  };
});
