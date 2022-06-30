import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import fs, { promises } from "fs";
import path from "path";
import magicString from "magic-string";
import mkdirp from "mkdirp";
import dts from "vite-plugin-dts";
import pkg from "./package.json";
// import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig(async ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));
  return {
    resolve: {
      alias: {
        "@packages": path.resolve(__dirname, "./packages"),
        "@lowcode": path.resolve(__dirname, "./packages/lowcode"),
      },
    },
    build: {
      outDir: "lib",
      minify: true,
      sourcemap: true,
      lib: {
        entry: "./packages/index.ts",
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
        input: "./packages/index.ts",
        output: [
          {
            format: "es", // es模式 minify失效
            entryFileNames: "[name].js",
            preserveModules: true,
            preserveModulesRoot: "lib",
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
    plugins: [
      vue(),
      AutoImport({
        include: [/\.[tj]sx?$/, /\.vue$/],
        imports: ["vue", "vue-router", "vue-i18n"],
        // resolvers: [ElementPlusResolver()],
        dts: "./packages/types/auto-imports.d.ts",
      }),
      // Components({
      //   dirs: [],
      //   dts: "./packages/types/components.d.ts",
      //   resolvers: [ElementPlusResolver({ importStyle: false })],
      // }),
      dts({
        include: "packages",
        exclude: ["types"],
        staticImport: true,
        logDiagnostics: true,
        outputDir: "lib/packages",
        beforeWriteFile: (filePath: string, content: string) => {
          filePath = filePath.replace("lib/packages", "lib");
          if (filePath.endsWith("qkfrontlib.d.ts")) {
            const shims = fs.readFileSync(
              filePath.replace(
                "lib/qkfrontlib.d.ts",
                "packages/types/shims.d.ts"
              ),
              "utf-8"
            );
            content += "\n\n" + shims;
          }
          return {
            filePath,
            content,
          };
        },
      }),
      {
        name: "vite:scss-extract",
        apply: "build",
        renderChunk(code) {
          const RE = /\.\/packages\/components\/.*\/styles/;
          if (code.match(RE)) {
            const s = new magicString(code).replace(RE, "./styles");
            return {
              code: s.toString(),
              map: s.generateMap({ hires: true }),
            };
          }
          return;
        },
        async buildEnd() {
          async function matchScss(
            dir: string,
            fn: (filename: string) => void
          ) {
            const files = await promises.readdir(dir);
            files.forEach((filename) => {
              filename = path.join(dir, filename);
              promises.stat(filename).then((stat) => {
                if (stat.isDirectory()) {
                  matchScss(filename, fn);
                } else if (/\.scss$/.test(filename)) {
                  fn && fn(filename);
                }
              });
            });
          }
          matchScss("packages", async (filename) => {
            const out = path.parse(
              filename.replace("packages", "lib/packages")
            );
            mkdirp.sync(out.dir);
            promises.writeFile(
              path.join(out.dir, out.name + out.ext),
              await promises.readFile(filename, "utf8"),
              "utf8"
            );
          });
        },
      },
    ],
    define: {
      __UI_NAME__: JSON.stringify(pkg.name),
      __UI_VERSION__: JSON.stringify(pkg.version),
    },
  };
});
