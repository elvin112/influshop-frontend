import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import BalmUI from "balm-ui"; // Official Google Material Components
import BalmUIPlus from "balm-ui-plus"; // BalmJS Team Material Components
import "balm-ui-css";
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import BaseLogo from "./components/UI/BaseLogo.vue";

const app = createApp(App);

app.component("TheHeader", TheHeader);
app.component("TheFooter", TheFooter);
app.component("BaseLogo", BaseLogo);

app.use(router);

app.use(BalmUI);
app.use(BalmUIPlus);

app.mount("#app");
