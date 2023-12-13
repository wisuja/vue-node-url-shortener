import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);

app.config.globalProperties.server_url = process.env.VUE_APP_API_ENDPOINT;

app.use(router).mount("#app");
