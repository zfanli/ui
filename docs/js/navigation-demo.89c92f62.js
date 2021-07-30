(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["navigation-demo"],{"2dd4":function(e,t,n){},"6b4e":function(e,t,n){"use strict";n("2dd4")},"9c11":function(e,t,n){"use strict";n("9d28")},"9d28":function(e,t,n){},f973:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{ref:"navScene",staticClass:"scene nav"},[n("navigation",{ref:"nav",attrs:{items:e.items,menuColor:e.menuColor}})],1),n("div",{staticClass:"scene red lighten-4"}),n("div",{staticClass:"scene green lighten-4"})])},i=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"navigatorWrapper"},[n("div",{ref:"navigator",staticClass:"navigator-wrapper",class:{bottom:!e.isCenter}},[n("nav",{staticClass:"menu",style:e.colors},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.open,expression:"open"}],staticClass:"menu-open",attrs:{id:"navigation-button",type:"checkbox"},domProps:{checked:Array.isArray(e.open)?e._i(e.open,null)>-1:e.open},on:{change:function(t){var n=e.open,o=t.target,i=!!o.checked;if(Array.isArray(n)){var a=null,r=e._i(n,a);o.checked?r<0&&(e.open=n.concat([a])):r>-1&&(e.open=n.slice(0,r).concat(n.slice(r+1)))}else e.open=i}}}),e._m(0),e._l(e.items,(function(t){return n("a",{key:t.name,staticClass:"menu-item",attrs:{href:t.link}},[e._v(" "+e._s(t.name)+" ")])}))],2),n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",version:"1.1"}},[n("defs",[n("filter",{attrs:{id:"shadowed-goo"}},[n("feGaussianBlur",{attrs:{in:"SourceGraphic",result:"blur",stdDeviation:"10"}}),n("feColorMatrix",{attrs:{in:"blur",mode:"matrix",values:"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7",result:"goo"}}),n("feGaussianBlur",{attrs:{in:"goo",stdDeviation:"3",result:"shadow"}}),n("feColorMatrix",{attrs:{in:"shadow",mode:"matrix",values:"0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2",result:"shadow"}}),n("feOffset",{attrs:{in:"shadow",dx:"1",dy:"1",result:"shadow"}}),n("feComposite",{attrs:{in2:"shadow",in:"goo",result:"goo"}}),n("feComposite",{attrs:{in2:"goo",in:"SourceGraphic",result:"mix"}})],1),n("filter",{attrs:{id:"goo"}},[n("feGaussianBlur",{attrs:{in:"SourceGraphic",result:"blur",stdDeviation:"10"}}),n("feColorMatrix",{attrs:{in:"blur",mode:"matrix",values:"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7",result:"goo"}}),n("feComposite",{attrs:{in2:"goo",in:"SourceGraphic",result:"mix"}})],1)])])])])},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("label",{staticClass:"menu-open-button",attrs:{for:"navigation-button"}},[n("span",{staticClass:"hamburger hamburger-1"}),n("span",{staticClass:"hamburger hamburger-2"}),n("span",{staticClass:"hamburger hamburger-3"})])}],s=(n("159b"),n("cffa")),l=n("1dac");s["b"].registerPlugin(l["a"]),l["a"].defaults({start:"top top",scrub:1});var c={name:"Navigation",props:{items:{type:Array,default:function(){return[{name:"Item1",link:"#link1",color:"#e91e63"},{name:"Item2",link:"#link2",color:"#e91e63"},{name:"Item3",link:"#link3",color:"#e91e63"},{name:"Item4",link:"#link4",color:"#e91e63"},{name:"Item5",link:"#link5",color:"#e91e63"},{name:"Item6",link:"#link6",color:"#e91e63"}]}},menuColor:{type:String,default:"#e91e63"}},data:function(){return{open:!1,isCenter:!0}},computed:{colors:function(){var e={"--menu-color":this.menuColor};return this.items.forEach((function(t,n){e["--item-color-"+(n+1)]=t.color})),e}},watch:{open:function(e){e&&!this.isCenter?this.openAnime.play():this.openAnime.reverse()}},mounted:function(){var e=this,t=this.$refs.navigator,n=this.$refs.navigatorWrapper,o=n.parentElement,i=16,a=16,r=.5;this.openAnime=s["b"].to(t,{x:105,y:-105,duration:.25,paused:!0}),l["a"].create({trigger:n,onEnter:function(){e.open=!1,e.isCenter=!1;var n=o.getBoundingClientRect();s["b"].fromTo(t,{left:n.left+n.width/2-40,bottom:window.innerHeight-80,position:"fixed"},{left:i,bottom:a,position:"fixed",duration:r})},onLeaveBack:function(){e.open=!1,e.isCenter=!0;var n=o.getBoundingClientRect(),a=t.getBoundingClientRect(),l=-1*(n.width/2-40+n.left-i-a.left);setTimeout((function(){return s["b"].fromTo(t,{left:l,bottom:-1*(a.bottom-80),position:"relative"},{left:0,bottom:0,position:"relative",duration:r})}),100)}})}},u=c,m=(n("9c11"),n("2877")),d=Object(m["a"])(u,a,r,!1,null,"28511e7c",null),f=d.exports,p={name:"NavigationDemo",components:{Navigation:f},data:function(){return{items:[{name:"插画",link:"#illustration",color:"#e28869"},{name:"岩彩",link:"#mineral",color:"#77c4d1"},{name:"水墨",link:"#ink-wash",color:"#288994"},{name:"摄影",link:"#photography",color:"#ced177"},{name:"“我”",link:"#me",color:"#e2ad69"},{name:"首页",link:"#app",color:"#f8baa7"}],menuColor:"#1f675a"}},mounted:function(){}},v=p,g=(n("6b4e"),Object(m["a"])(v,o,i,!1,null,"0ed10e29",null));t["default"]=g.exports}}]);
//# sourceMappingURL=navigation-demo.89c92f62.js.map