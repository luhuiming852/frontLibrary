import type { App } from "vue";
import { initDynamic, textButton, tableExtend } from "./../../packages";
import "./../../packages/styles/tableExtend.scss";
import "./../../packages/styles/textButton.scss";

export default function (app: App) {
  app.component("TextButton", textButton);
  app.component("TableExtend", tableExtend);
  const dynamic = initDynamic(app);
  //, { API_ROOT: "/lowcode" }
  app.component("DynamicPage", dynamic);
}
