import tableExtend from "./src/index.vue";
import type { App } from "vue";

export type { TableProp, TableColumn } from "./type";

tableExtend.install = (app: App) => {
  app.component("TableExtend", tableExtend);
};

export default tableExtend;
