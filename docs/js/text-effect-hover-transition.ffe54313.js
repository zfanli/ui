(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["text-effect-hover-transition"],{5760:function(e,t,s){"use strict";s.r(t);var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{ref:"body",staticClass:"body"},[s("div",{staticClass:"cursor"}),e._m(0),e._m(1)])},n=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"circles"},[s("div",{staticClass:"circle circle1"}),s("div",{staticClass:"circle circle2"}),s("div",{staticClass:"circle circle3"})])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"content"},[s("div",{staticClass:"logo"},[e._v("Text Effect: "),s("br"),e._v("Hover Transition!")])])}],o=s("cffa"),c={data:function(){return{offsetX:0,offsetY:0}},mounted:function(){this.onResize(),window.addEventListener("resize",this.onResize)},destroyed:function(){window.removeEventListener("resize",this.onResize)},methods:{onResize:function(){this.cleanup();var e=this.$refs.body.getBoundingClientRect();this.offsetX=e.left,this.offsetY=e.top,this.$refs.body.addEventListener("mousemove",this.mouseMove)},cleanup:function(){this.$refs.body.removeEventListener("mousemove",this.mouseMove)},mouseMove:function(e){var t=e.clientX,s=e.clientY,i=t-this.offsetX,n=s-this.offsetY;o["b"].set(".cursor",{x:i,y:n}),o["b"].to(".circle",{x:i,y:n,stagger:-.1})}}},r=c,a=(s("a45f"),s("2877")),f=Object(a["a"])(r,i,n,!1,null,"5f8a95f1",null);t["default"]=f.exports},a45f:function(e,t,s){"use strict";s("eeaa")},eeaa:function(e,t,s){}}]);
//# sourceMappingURL=text-effect-hover-transition.ffe54313.js.map