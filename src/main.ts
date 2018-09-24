import Vue from "vue";
import ElementUI from "element-ui";
import "@/assets/css/element/index.css";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "@/registerServiceWorker";
import initFirebase from "@/middleware/firebase_middleware";

Vue.config.productionTip = false;

Vue.use(ElementUI);

initFirebase();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
