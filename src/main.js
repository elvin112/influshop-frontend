import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";

import BalmUI from "balm-ui"; // Official Google Material Components
import BalmUIPlus from "balm-ui-plus"; // BalmJS Team Material Components
import "balm-ui-css";
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
import TheSidebar from "./components/layout/TheSidebar.vue";
import BaseLogo from "./components/UI/BaseLogo.vue";
import BaseCard from "./components/UI/BaseCard.vue";
import LoadingSpinner from "./components/UI/LoadingSpinner.vue";
import ErrorMsg from "./components/UI/ErrorMsg.vue";
import SimpleAlertMsg from "./components/UI/SimpleAlertMsg.vue";
import Searchbar from "./components/Searchbar.vue";

const app = createApp(App);

app.component("TheHeader", TheHeader);
app.component("TheFooter", TheFooter);
app.component("TheSidebar", TheSidebar);
app.component("BaseLogo", BaseLogo);
app.component("BaseCard", BaseCard);
app.component("LoadingSpinner", LoadingSpinner);
app.component("ErrorMsg", ErrorMsg);
app.component("SimpleAlertMsg", SimpleAlertMsg);
app.component("Searchbar", Searchbar);

app.use(BalmUI);
app.use(BalmUIPlus);

app.use(router);
app.use(store);

app.mount("#app");
