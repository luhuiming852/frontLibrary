import contextMenu from "./src/index.vue";
import type { App } from "vue";

contextMenu.install = (app: App) => {
  app.component("ContextMenu", contextMenu);
};

export default contextMenu;
