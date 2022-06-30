import { loadEnv, ConfigEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";

export default ({ mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [
      vue(),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/],
        imports: ["vue", "vue-router", "vue-i18n"],
        resolvers: [ElementPlusResolver()],
        dts: "./src/types/auto-imports.d.ts",
      }),
      Components({
        dirs: [],
        dts: "./src/types/components.d.ts",
        resolvers: [ElementPlusResolver({ importStyle: false })],
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@packages": resolve(__dirname, "packages"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3001/",
          changeOrigin: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          // 预编译SCSS变量文件
          // additionalData: `@use "@/styles/theme.scss" as *;`,
        },
      },
    },
  };
};
