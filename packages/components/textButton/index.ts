import type { App } from "vue";
import textButton from "./src/index.vue";

textButton.install = (app: App) => {
  app.component("TextButton", textButton);
};

export default textButton;
