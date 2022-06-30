import textButton from "./textButton";
import tableExtend from "./tableExtend";
import contextMenu from "./contextMenu";
import type { App } from "vue";

const components: any[] = [textButton, tableExtend, contextMenu];

function install(app: App) {
  components.forEach((component) => {
    app.use(component);
  });
}

export type { TableProp, TableColumn } from "@packages/components/tableExtend";

export { install, textButton, tableExtend, contextMenu };
