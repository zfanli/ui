import Vue from "vue";
import App from "./App.vue";
import components from "./components";
import router from "./router";
import vuetify from "./plugins/vuetify";
import toolbox from "./plugins/toolbox";

Vue.config.productionTip = false;
Vue.use(toolbox);

// the v2 way to register components globally
Object.entries(components).forEach(([key, value]) => {
  Vue.component(key, value);
});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
