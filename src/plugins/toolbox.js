import Vue from "vue";

const toolbox = {
  install: (app) => {
    const detectMobile = () => {
      app.prototype.$tools.mobile = window.innerWidth <= 580;
    };
    app.prototype.$tools = Vue.observable({ mobile: false });
    window.addEventListener("resize", detectMobile);
    detectMobile();
  },
};

export default toolbox;
