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
    // // binding observed values
    // const tools = Vue.observable({ mobile: false });
    // // binding static tools
    // tools.hljs = hljs;
    // tools.marked = marked;

    // tools.printName = (name) => console.log(name);

    const Toolbox = function() {
      console.log("created");
    };
    Toolbox.prototype.data = Vue.observable({ mobile: false });
    Toolbox.prototype.hljs = hljs;
    Toolbox.prototype.marked = marked;
    Toolbox.prototype.printName = function() {
      console.log(this.componentName);
    };

    app.mixin({
      beforeCreate() {
        Object.defineProperty(this, "$tools", {
          value: new Toolbox(),
          writable: false,
        });
        Object.defineProperty(this.$tools, "componentName", {
          value: this.$options.name,
          writable: false,
        });

        this.$tools.printName();
        console.log(this.$tools.data);
      },
    });

    // handle observed value changes
    const detectMobile = () => {
      Toolbox.prototype.data.mobile = window.innerWidth <= 580;
    };
    window.addEventListener("resize", detectMobile);
    detectMobile();
  },
};

export default toolbox;
