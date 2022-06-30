import elementplus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";
import "element-plus/dist/index.css";
import * as icons from "@element-plus/icons-vue";
import type { App } from "vue";

export default function (app: App) {
  app.use(elementplus, { size: "default", locale });
  //   注册图标
  const keys = Object.keys(icons);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    app.component(icons[key].name, icons[key]);
  }
}
