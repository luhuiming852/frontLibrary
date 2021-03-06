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
      minify: false,
      sourcemap: true,
      lib: {
        entry: "packages/index.ts",
        name: "QkFrontlib",
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
        output: [
          {
            assetFileNames: `${pkg.name}.es.css`,
          },
          {
            format: "es",
            entryFileNames: `${pkg.name}.es.js`,
          },
          {
            format: "umd",
            entryFileNames: `${pkg.name}.js`,
            globals: {
              vue: "Vue",
              "element-plus": "element-plus",
              axios: "axios",
              dayjs: "dayjs",
            },
          },
        ],
      },
    },
    plugins: [vue()],
    define: {
      __UI_NAME__: JSON.stringify(pkg.name),
      __UI_VERSION__: JSON.stringify(pkg.version),
    },
  };
});
