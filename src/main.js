import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import toolbox from "./plugins/toolbox";

Vue.config.productionTip = false;
Vue.use(toolbox);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
