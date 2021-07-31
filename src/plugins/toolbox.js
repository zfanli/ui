import Vue from "vue";
import marked from "marked";
import hljs from "highlight.js";

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-",
});

const toolbox = {
  install: (app) => {
    // binding observed values
    app.prototype.$tools = Vue.observable({ mobile: false });
    // binding static tools
    app.prototype.$tools.hljs = hljs;
    app.prototype.$tools.marked = marked;

    // handle observed value changes
    const detectMobile = () => {
      app.prototype.$tools.mobile = window.innerWidth <= 580;
    };
    window.addEventListener("resize", detectMobile);
    detectMobile();
  },
};

export default toolbox;
