import type { App } from "vue";
import elementplus from "./element-plus";
import i18n from "./i18n";
import lowcode from "./lowcode";

export default {
  install: (app: App, options?: any) => {
    app.use(elementplus);
    app.use(lowcode);
    app.use(i18n);
  },
};
