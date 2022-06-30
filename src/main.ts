import App from "./App.vue";
import router from "@/router/index";
import plugins from "@/plugins/index";
import "@/styles/index.scss";

const app = createApp(App);

app.use(router);

app.use(plugins);

app.mount("#app");
