(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["anime-demo~gallery~navigation-demo~parallax~s-progress"],{"1dac":function(e,t,r){"use strict";r.d(t,"a",(function(){return gt}));
/*!
 * ScrollTrigger 3.7.0
 * https://greensock.com
 *
 * @license Copyright 2008-2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var n,i,o,s,a,l,c,u,f,p,d,h,g,v,m,x,y,b,w,k,C,T,O,E,M,S,P,_=1,R=[],A=[],z=Date.now,B=z(),L=0,I=1,N=function(e){return e},F=function(e){return Math.round(1e5*e)/1e5||0},D=function(){return"undefined"!==typeof window},W=function(){return n||D()&&(n=window.gsap)&&n.registerPlugin&&n},q=function(e){return!!~c.indexOf(e)},H=function(e,t){return~R.indexOf(e)&&R[R.indexOf(e)+1][t]},X=function(e,t){var r=t.s,n=t.sc,i=A.indexOf(e),o=n===be.sc?1:2;return!~i&&(i=A.push(e)-1),A[i+o]||(A[i+o]=H(e,r)||(q(e)?n:function(t){return arguments.length?e[r]=t:e[r]}))},Y=function(e){return H(e,"getBoundingClientRect")||(q(e)?function(){return ut.width=o.innerWidth,ut.height=o.innerHeight,ut}:function(){return Te(e)})},j=function(e,t,r){var n=r.d,i=r.d2,s=r.a;return(s=H(e,"getBoundingClientRect"))?function(){return s()[n]}:function(){return(t?o["inner"+i]:e["client"+i])||0}},J=function(e,t){return!t||~R.indexOf(e)?Y(e):function(){return ut}},V=function(e,t){var r=t.s,n=t.d2,i=t.d,s=t.a;return(r="scroll"+n)&&(s=H(e,r))?s()-Y(e)()[i]:q(e)?Math.max(a[r],l[r])-(o["inner"+n]||a["client"+n]||l["client"+n]):e[r]-e["offset"+n]},U=function(e,t){for(var r=0;r<C.length;r+=3)(!t||~t.indexOf(C[r+1]))&&e(C[r],C[r+1],C[r+2])},Z=function(e){return"string"===typeof e},$=function(e){return"function"===typeof e},G=function(e){return"number"===typeof e},K=function(e){return"object"===typeof e},Q=function(e){return $(e)&&e()},ee=function(e,t){return function(){var r=Q(e),n=Q(t);return function(){Q(r),Q(n)}}},te=Math.abs,re="scrollLeft",ne="scrollTop",ie="left",oe="top",se="right",ae="bottom",le="width",ce="height",ue="Right",fe="Left",pe="Top",de="Bottom",he="padding",ge="margin",ve="Width",me="Height",xe="px",ye={s:re,p:ie,p2:fe,os:se,os2:ue,d:le,d2:ve,a:"x",sc:function(e){return arguments.length?o.scrollTo(e,be.sc()):o.pageXOffset||s[re]||a[re]||l[re]||0}},be={s:ne,p:oe,p2:pe,os:ae,os2:de,d:ce,d2:me,a:"y",op:ye,sc:function(e){return arguments.length?o.scrollTo(ye.sc(),e):o.pageYOffset||s[ne]||a[ne]||l[ne]||0}},we=function(e){return o.getComputedStyle(e)},ke=function(e){var t=we(e).position;e.style.position="absolute"===t||"fixed"===t?t:"relative"},Ce=function(e,t){for(var r in t)r in e||(e[r]=t[r]);return e},Te=function(e,t){var r=t&&"matrix(1, 0, 0, 1, 0, 0)"!==we(e)[y]&&n.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return r&&r.progress(0).kill(),i},Oe=function(e,t){var r=t.d2;return e["offset"+r]||e["client"+r]||0},Ee=function(e){var t,r=[],n=e.labels,i=e.duration();for(t in n)r.push(n[t]/i);return r},Me=function(e){return function(t){return n.utils.snap(Ee(e),t)}},Se=function(e){return function(t,r){var n,i=Ee(e);if(i.sort((function(e,t){return e-t})),r.direction>0){for(t-=1e-4,n=0;n<i.length;n++)if(i[n]>=t)return i[n];return i.pop()}n=i.length,t+=1e-4;while(n--)if(i[n]<=t)return i[n];return i[0]}},Pe=function(e,t,r,n){return r.split(",").forEach((function(r){return e(t,r,n)}))},_e=function(e,t,r){return e.addEventListener(t,r,{passive:!0})},Re=function(e,t,r){return e.removeEventListener(t,r)},Ae={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},ze={toggleActions:"play",anticipatePin:0},Be={top:0,left:0,center:.5,bottom:1,right:1},Le=function(e,t){if(Z(e)){var r=e.indexOf("="),n=~r?+(e.charAt(r-1)+1)*parseFloat(e.substr(r+1)):0;~r&&(e.indexOf("%")>r&&(n*=t/100),e=e.substr(0,r-1)),e=n+(e in Be?Be[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Ie=function(e,t,r,n,i,o,a){var c=i.startColor,u=i.endColor,f=i.fontSize,p=i.indent,d=i.fontWeight,h=s.createElement("div"),g=q(r)||"fixed"===H(r,"pinType"),v=-1!==e.indexOf("scroller"),m=g?l:r,x=-1!==e.indexOf("start"),y=x?c:u,b="border-color:"+y+";font-size:"+f+";color:"+y+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return b+="position:"+(v&&g?"fixed;":"absolute;"),(v||!g)&&(b+=(n===be?se:ae)+":"+(o+parseFloat(p))+"px;"),a&&(b+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),h._isStart=x,h.setAttribute("class","gsap-marker-"+e),h.style.cssText=b,h.innerText=t||0===t?e+"-"+t:e,m.children[0]?m.insertBefore(h,m.children[0]):m.appendChild(h),h._offset=h["offset"+n.op.d2],Ne(h,0,n,x),h},Ne=function(e,t,r,i){var o={display:"block"},s=r[i?"os2":"p2"],a=r[i?"p2":"os2"];e._isFlipped=i,o[r.a+"Percent"]=i?-100:0,o[r.a]=i?"1px":0,o["border"+s+ve]=1,o["border"+a+ve]=0,o[r.p]=t+"px",n.set(e,o)},Fe=[],De={},We=function(){return p||(p=f(tt))},qe=function(){p||(p=f(tt),L||Ue("scrollStart"),L=z())},He=function(){return!m&&!E&&!s.fullscreenElement&&u.restart(!0)},Xe={},Ye=[],je=[],Je=function(e){var t,r=n.ticker.frame,s=[],a=0;if(P!==r||_){for(Ge();a<je.length;a+=4)t=o.matchMedia(je[a]).matches,t!==je[a+3]&&(je[a+3]=t,t?s.push(a):Ge(1,je[a])||$(je[a+2])&&je[a+2]());for($e(),a=0;a<s.length;a++)t=s[a],S=je[t],je[t+2]=je[t+1](e);S=0,i&&Ke(0,1),P=r,Ue("matchMedia")}},Ve=function e(){return Re(gt,"scrollEnd",e)||Ke(!0)},Ue=function(e){return Xe[e]&&Xe[e].map((function(e){return e()}))||Ye},Ze=[],$e=function(e){for(var t=0;t<Ze.length;t+=5)e&&Ze[t+4]!==e||(Ze[t].style.cssText=Ze[t+1],Ze[t].getBBox&&Ze[t].setAttribute("transform",Ze[t+2]||""),Ze[t+3].uncache=1)},Ge=function(e,t){var r;for(b=0;b<Fe.length;b++)r=Fe[b],t&&r.media!==t||(e?r.kill(1):r.revert());t&&$e(t),t||Ue("revert")},Ke=function(e,t){if(!L||e){var r=Ue("refreshInit");T&&gt.sort(),t||Ge(),Fe.forEach((function(e){return e.refresh()})),r.forEach((function(e){return e&&e.render&&e.render(-1)})),A.forEach((function(e){return"function"===typeof e&&(e.rec=0)})),u.pause(),Ue("refresh")}else _e(gt,"scrollEnd",Ve)},Qe=0,et=1,tt=function(){var e=Fe.length,t=z(),r=t-B>=50,n=e&&Fe[0].scroll();if(et=Qe>n?-1:1,Qe=n,r&&(L&&!x&&t-L>200&&(L=0,Ue("scrollEnd")),g=B,B=t),et<0){b=e;while(b-- >0)Fe[b]&&Fe[b].update(0,r);et=1}else for(b=0;b<e;b++)Fe[b]&&Fe[b].update(0,r);p=0},rt=[ie,oe,ae,se,ge+de,ge+ue,ge+pe,ge+fe,"display","flexShrink","float","zIndex","grid-column-start","grid-column-end","grid-row-start","grid-row-end","grid-area","justify-self","align-self","place-self"],nt=rt.concat([le,ce,"boxSizing","max"+ve,"max"+me,"position",ge,he,he+pe,he+ue,he+de,he+fe]),it=function(e,t,r){if(at(r),e.parentNode===t){var n=t.parentNode;n&&(n.insertBefore(e,t),n.removeChild(t))}},ot=function(e,t,r,n){if(e.parentNode!==t){var i,o=rt.length,s=t.style,a=e.style;while(o--)i=rt[o],s[i]=r[i];s.position="absolute"===r.position?"absolute":"relative","inline"===r.display&&(s.display="inline-block"),a[ae]=a[se]="auto",s.overflow="visible",s.boxSizing="border-box",s[le]=Oe(e,ye)+xe,s[ce]=Oe(e,be)+xe,s[he]=a[ge]=a[oe]=a[ie]="0",at(n),a[le]=a["max"+ve]=r[le],a[ce]=a["max"+me]=r[ce],a[he]=r[he],e.parentNode.insertBefore(t,e),t.appendChild(e)}},st=/([A-Z])/g,at=function(e){if(e){var t,r,i=e.t.style,o=e.length,s=0;for((e.t._gsap||n.core.getCache(e.t)).uncache=1;s<o;s+=2)r=e[s+1],t=e[s],r?i[t]=r:i[t]&&i.removeProperty(t.replace(st,"-$1").toLowerCase())}},lt=function(e){for(var t=nt.length,r=e.style,n=[],i=0;i<t;i++)n.push(nt[i],r[nt[i]]);return n.t=e,n},ct=function(e,t,r){for(var n,i=[],o=e.length,s=r?8:0;s<o;s+=2)n=e[s],i.push(n,n in t?t[n]:e[s+1]);return i.t=e.t,i},ut={left:0,top:0},ft=function(e,t,r,n,i,o,s,c,u,f,p,h){if($(e)&&(e=e(c)),Z(e)&&"max"===e.substr(0,3)&&(e=h+("="===e.charAt(4)?Le("0"+e.substr(3),r):0)),G(e))s&&Ne(s,r,n,!0);else{$(t)&&(t=t(c));var g,v,m,x=d(t)[0]||l,y=Te(x)||{},b=e.split(" ");y&&(y.left||y.top)||"none"!==we(x).display||(m=x.style.display,x.style.display="block",y=Te(x),m?x.style.display=m:x.style.removeProperty("display")),g=Le(b[0],y[n.d]),v=Le(b[1]||"0",r),e=y[n.p]-u[n.p]-f+g+i-v,s&&Ne(s,v,n,r-v<20||s._isStart&&v>20),r-=r-v}if(o){var w=e+r,k=o._isStart;h="scroll"+n.d2,Ne(o,w,n,k&&w>20||!k&&(p?Math.max(l[h],a[h]):o.parentNode[h])<=w+1),p&&(u=Te(s),p&&(o.style[n.op.p]=u[n.op.p]-n.op.m-o._offset+xe))}return Math.round(e)},pt=/(?:webkit|moz|length|cssText|inset)/i,dt=function(e,t,r,i){if(e.parentNode!==t){var o,s,a=e.style;if(t===l){for(o in e._stOrig=a.cssText,s=we(e),s)+o||pt.test(o)||!s[o]||"string"!==typeof a[o]||"0"===o||(a[o]=s[o]);a.top=r,a.left=i}else a.cssText=e._stOrig;n.core.getCache(e).uncache=1,t.appendChild(e)}},ht=function(e,t){var r,i,o=X(e,t),s="_scroll"+t.p2,a=function t(a,l,c,u,f){var p=t.tween,d=l.onComplete,h={};return p&&p.kill(),r=Math.round(c),l[s]=a,l.modifiers=h,h[s]=function(e){return e=F(o()),e!==r&&e!==i&&Math.abs(e-r)>2?(p.kill(),t.tween=0):e=c+u*p.ratio+f*p.ratio*p.ratio,i=r,r=F(e)},l.onComplete=function(){t.tween=0,d&&d.call(p)},p=t.tween=n.to(e,l),p};return e[s]=o,e.addEventListener("wheel",(function(){return a.tween&&a.tween.kill()&&(a.tween=0)})),a};ye.op=be;var gt=function(){function e(t,r){i||e.register(n)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),this.init(t,r)}var t=e.prototype;return t.init=function(t,r){if(this.progress=this.start=0,this.vars&&this.kill(1),I){t=Ce(Z(t)||G(t)||t.nodeType?{trigger:t}:t,ze);var i,c,u,f,p,v,y,w,k,C,E,P,A,B,F,D,W,Y,U,Q,ee,re,ne,ie,oe,se,ae,Ee,Pe,Be,Ne,We,Xe,Ye,je,Je,Ue=t.horizontal?ye:be,Ze=t,$e=Ze.onUpdate,Ge=Ze.toggleClass,Ke=Ze.id,Qe=Ze.onToggle,tt=Ze.onRefresh,rt=Ze.scrub,nt=Ze.trigger,st=Ze.pin,ut=Ze.pinSpacing,pt=Ze.invalidateOnRefresh,gt=Ze.anticipatePin,vt=Ze.onScrubComplete,mt=Ze.onSnapComplete,xt=Ze.once,yt=Ze.snap,bt=Ze.pinReparent,wt=!rt&&0!==rt,kt=d(t.scroller||o)[0],Ct=n.core.getCache(kt),Tt=q(kt),Ot="pinType"in t?"fixed"===t.pinType:Tt||"fixed"===H(kt,"pinType"),Et=[t.onEnter,t.onLeave,t.onEnterBack,t.onLeaveBack],Mt=wt&&t.toggleActions.split(" "),St="markers"in t?t.markers:ze.markers,Pt=Tt?0:parseFloat(we(kt)["border"+Ue.p2+ve])||0,_t=this,Rt=t.onRefreshInit&&function(){return t.onRefreshInit(_t)},At=j(kt,Tt,Ue),zt=J(kt,Tt),Bt=0;_t.media=S,gt*=45,_t.scroller=kt,_t.scroll=X(kt,Ue),f=_t.scroll(),_t.vars=t,r=r||t.animation,"refreshPriority"in t&&(T=1),Ct.tweenScroll=Ct.tweenScroll||{top:ht(kt,be),left:ht(kt,ye)},_t.tweenTo=i=Ct.tweenScroll[Ue.p],r&&(r.vars.lazy=!1,r._initted||!1!==r.vars.immediateRender&&!1!==t.immediateRender&&r.render(0,!0,!0),_t.animation=r.pause(),r.scrollTrigger=_t,Ne=G(rt)&&rt,Ne&&(Be=n.to(r,{ease:"power3",duration:Ne,onComplete:function(){return vt&&vt(_t)}})),Ee=0,Ke||(Ke=r.vars.id)),Fe.push(_t),yt&&(K(yt)||(yt={snapTo:yt}),"scrollBehavior"in l.style&&n.set(Tt?[l,a]:kt,{scrollBehavior:"auto"}),u=$(yt.snapTo)?yt.snapTo:"labels"===yt.snapTo?Me(r):"labelsDirectional"===yt.snapTo?Se(r):n.utils.snap(yt.snapTo),We=yt.duration||{min:.1,max:2},We=K(We)?h(We.min,We.max):h(We,We),Xe=n.delayedCall(yt.delay||Ne/2||.1,(function(){if(Math.abs(_t.getVelocity())<10&&!x&&Bt!==_t.scroll()){var e=r&&!wt?r.totalProgress():_t.progress,t=(e-Pe)/(z()-g)*1e3||0,o=n.utils.clamp(-_t.progress,1-_t.progress,te(t/2)*t/.185),s=_t.progress+(!1===yt.inertia?0:o),a=h(0,1,u(s,_t)),l=_t.scroll(),c=Math.round(v+a*A),f=yt,p=f.onStart,d=f.onInterrupt,m=f.onComplete,b=i.tween;if(l<=y&&l>=v&&c!==l){if(b&&!b._initted&&b.data<=Math.abs(c-l))return;!1===yt.inertia&&(o=a-_t.progress),i(c,{duration:We(te(.185*Math.max(te(s-e),te(a-e))/t/.05||0)),ease:yt.ease||"power3",data:Math.abs(c-l),onInterrupt:function(){return Xe.restart(!0)&&d&&d(_t)},onComplete:function(){Bt=_t.scroll(),Ee=Pe=r&&!wt?r.totalProgress():_t.progress,mt&&mt(_t),m&&m(_t)}},l,o*A,c-l-o*A),p&&p(_t,i.tween)}}else _t.isActive&&Xe.restart(!0)})).pause()),Ke&&(De[Ke]=_t),nt=_t.trigger=d(nt||st)[0],st=!0===st?nt:d(st)[0],Z(Ge)&&(Ge={targets:nt,className:Ge}),st&&(!1===ut||ut===ge||(ut=!(!ut&&"flex"===we(st.parentNode).display)&&he),_t.pin=st,!1!==t.force3D&&n.set(st,{force3D:!0}),c=n.core.getCache(st),c.spacer?B=c.pinState:(c.spacer=W=s.createElement("div"),W.setAttribute("class","pin-spacer"+(Ke?" pin-spacer-"+Ke:"")),c.pinState=B=lt(st)),_t.spacer=W=c.spacer,ae=we(st),ne=ae[ut+Ue.os2],U=n.getProperty(st),Q=n.quickSetter(st,Ue.a,xe),ot(st,W,ae),D=lt(st)),St&&(P=K(St)?Ce(St,Ae):Ae,C=Ie("scroller-start",Ke,kt,Ue,P,0),E=Ie("scroller-end",Ke,kt,Ue,P,0,C),Y=C["offset"+Ue.op.d2],w=Ie("start",Ke,kt,Ue,P,Y),k=Ie("end",Ke,kt,Ue,P,Y),Ot||R.length&&!0===H(kt,"fixedMarkers")||(ke(Tt?l:kt),n.set([C,E],{force3D:!0}),oe=n.quickSetter(C,Ue.a,xe),se=n.quickSetter(E,Ue.a,xe))),_t.revert=function(e){var t=!1!==e||!_t.enabled,n=m;t!==_t.isReverted&&(t&&(_t.scroll.rec||(_t.scroll.rec=_t.scroll()),je=Math.max(_t.scroll(),_t.scroll.rec||0),Ye=_t.progress,Je=r&&r.progress()),w&&[w,k,C,E].forEach((function(e){return e.style.display=t?"none":"block"})),t&&(m=1),_t.update(t),m=n,st&&(t?it(st,W,B):(!bt||!_t.isActive)&&ot(st,W,we(st),ie)),_t.isReverted=t)},_t.refresh=function(i,o){if(!m&&_t.enabled||o)if(st&&i&&L)_e(e,"scrollEnd",Ve);else{m=1,Be&&Be.pause(),pt&&r&&r.progress(0).invalidate(),_t.isReverted||_t.revert();var s,a,c,u,h,g,x,b,T,M,S=At(),P=zt(),_=V(kt,Ue),R=0,z=0,I=t.end,N=t.endTrigger||nt,q=t.start||(0!==t.start&&nt?st?"0 0":"0 100%":0),H=t.pinnedContainer&&d(t.pinnedContainer)[0],Y=nt&&Math.max(0,Fe.indexOf(_t))||0,j=Y;while(j--)g=Fe[j],g.end||g.refresh(0,1)||(m=1),x=g.pin,!x||x!==nt&&x!==st||g.isReverted||(M||(M=[]),M.unshift(g),g.revert());v=ft(q,nt,S,Ue,_t.scroll(),w,C,_t,P,Pt,Ot,_)||(st?-.001:0),$(I)&&(I=I(_t)),Z(I)&&!I.indexOf("+=")&&(~I.indexOf(" ")?I=(Z(q)?q.split(" ")[0]:"")+I:(R=Le(I.substr(2),S),I=Z(q)?q:v+R,N=nt)),y=Math.max(v,ft(I||(N?"100% 0":_),N,S,Ue,_t.scroll()+R,k,E,_t,P,Pt,Ot,_))||-.001,A=y-v||(v-=.01)&&.001,R=0,j=Y;while(j--)g=Fe[j],x=g.pin,x&&g.start-g._pinPush<v&&(s=g.end-g.start,(x===nt||x===H)&&(R+=s),x===st&&(z+=s));if(v+=R,y+=R,_t._pinPush=z,w&&R&&(s={},s[Ue.a]="+="+R,H&&(s[Ue.p]="-="+_t.scroll()),n.set([w,k],s)),st)s=we(st),u=Ue===be,c=_t.scroll(),ee=parseFloat(U(Ue.a))+z,!_&&y>1&&((Tt?l:kt).style["overflow-"+Ue.a]="scroll"),ot(st,W,s),D=lt(st),a=Te(st,!0),b=Ot&&X(kt,u?ye:be)(),ut&&(ie=[ut+Ue.os2,A+z+xe],ie.t=W,j=ut===he?Oe(st,Ue)+A+z:0,j&&ie.push(Ue.d,j+xe),at(ie),Ot&&_t.scroll(je)),Ot&&(h={top:a.top+(u?c-v:b)+xe,left:a.left+(u?b:c-v)+xe,boxSizing:"border-box",position:"fixed"},h[le]=h["max"+ve]=Math.ceil(a.width)+xe,h[ce]=h["max"+me]=Math.ceil(a.height)+xe,h[ge]=h[ge+pe]=h[ge+ue]=h[ge+de]=h[ge+fe]="0",h[he]=s[he],h[he+pe]=s[he+pe],h[he+ue]=s[he+ue],h[he+de]=s[he+de],h[he+fe]=s[he+fe],F=ct(B,h,bt)),r?(T=r._initted,O(1),r.render(r.duration(),!0,!0),re=U(Ue.a)-ee+A+z,A!==re&&F.splice(F.length-2,2),r.render(0,!0,!0),T||r.invalidate(),O(0)):re=A;else if(nt&&_t.scroll()){a=nt.parentNode;while(a&&a!==l)a._pinOffset&&(v-=a._pinOffset,y-=a._pinOffset),a=a.parentNode}M&&M.forEach((function(e){return e.revert(!1)})),_t.start=v,_t.end=y,f=p=_t.scroll(),f<je&&_t.scroll(je),_t.revert(!1),m=0,r&&wt&&r._initted&&r.progress()!==Je&&r.progress(Je,!0).render(r.time(),!0,!0),Ye!==_t.progress&&(Be&&r.totalProgress(Ye,!0),_t.progress=Ye,_t.update()),st&&ut&&(W._pinOffset=Math.round(_t.progress*re)),tt&&tt(_t)}},_t.getVelocity=function(){return(_t.scroll()-p)/(z()-g)*1e3||0},_t.update=function(e,t){var n,o,s,a,c,u,h=_t.scroll(),x=e?0:(h-v)/A,b=x<0?0:x>1?1:x||0,w=_t.progress;if(t&&(p=f,f=h,yt&&(Pe=Ee,Ee=r&&!wt?r.totalProgress():b)),gt&&!b&&st&&!m&&!_&&L&&v<h+(h-p)/(z()-g)*gt&&(b=1e-4),b!==w&&_t.enabled){if(n=_t.isActive=!!b&&b<1,o=!!w&&w<1,u=n!==o,c=u||!!b!==!!w,_t.direction=b>w?1:-1,_t.progress=b,wt||(!Be||m||_?r&&r.totalProgress(b,!!m):(Be.vars.totalProgress=b,Be.invalidate().restart())),st)if(e&&ut&&(W.style[ut+Ue.os2]=ne),Ot){if(c){if(a=!e&&b>w&&y+1>h&&h+1>=V(kt,Ue),bt)if(e||!n&&!a)dt(st,W);else{var k=Te(st,!0),T=h-v;dt(st,l,k.top+(Ue===be?T:0)+xe,k.left+(Ue===be?0:T)+xe)}at(n||a?F:D),re!==A&&b<1&&n||Q(ee+(1!==b||a?0:re))}}else Q(ee+re*b);yt&&!i.tween&&!m&&!_&&Xe.restart(!0),Ge&&(u||xt&&b&&(b<1||!M))&&d(Ge.targets).forEach((function(e){return e.classList[n||xt?"add":"remove"](Ge.className)})),$e&&!wt&&!e&&$e(_t),c&&!m?(s=b&&!w?0:1===b?1:1===w?2:3,wt&&(a=!u&&"none"!==Mt[s+1]&&Mt[s+1]||Mt[s],r&&("complete"===a||"reset"===a||a in r)&&("complete"===a?r.pause().totalProgress(1):"reset"===a?r.restart(!0).pause():"restart"===a?r.restart(!0):r[a]()),$e&&$e(_t)),!u&&M||(Qe&&u&&Qe(_t),Et[s]&&Et[s](_t),xt&&(1===b?_t.kill(!1,1):Et[s]=0),u||(s=1===b?1:3,Et[s]&&Et[s](_t)))):wt&&$e&&!m&&$e(_t)}se&&(oe(h+(C._isFlipped?1:0)),se(h))},_t.enable=function(t,r){_t.enabled||(_t.enabled=!0,_e(kt,"resize",He),_e(kt,"scroll",qe),Rt&&_e(e,"refreshInit",Rt),!1!==t&&(_t.progress=Ye=0,f=p=Bt=_t.scroll()),!1!==r&&_t.refresh())},_t.getTween=function(e){return e&&i?i.tween:Be},_t.disable=function(t,r){if(_t.enabled&&(!1!==t&&_t.revert(),_t.enabled=_t.isActive=!1,r||Be&&Be.pause(),je=0,c&&(c.uncache=1),Rt&&Re(e,"refreshInit",Rt),Xe&&(Xe.pause(),i.tween&&i.tween.kill()&&(i.tween=0)),!Tt)){var n=Fe.length;while(n--)if(Fe[n].scroller===kt&&Fe[n]!==_t)return;Re(kt,"resize",He),Re(kt,"scroll",qe)}},_t.kill=function(e,t){_t.disable(e,t),Ke&&delete De[Ke];var n=Fe.indexOf(_t);Fe.splice(n,1),n===b&&et>0&&b--,r&&(r.scrollTrigger=null,e&&r.render(-1),t||r.kill()),w&&[w,k,C,E].forEach((function(e){return e.parentNode&&e.parentNode.removeChild(e)})),st&&(c&&(c.uncache=1),n=0,Fe.forEach((function(e){return e.pin===st&&n++})),n||(c.spacer=0))},_t.enable(!1,!1),r&&r.add&&!A?n.delayedCall(.01,(function(){return v||y||_t.refresh()}))&&(A=.01)&&(v=y=0):_t.refresh()}else this.update=this.refresh=this.kill=N},e.register=function(t){if(!i&&(n=t||W(),D()&&window.document&&(o=window,s=document,a=s.documentElement,l=s.body),n&&(d=n.utils.toArray,h=n.utils.clamp,O=n.core.suppressOverwrites||N,n.core.globals("ScrollTrigger",e),l))){f=o.requestAnimationFrame||function(e){return setTimeout(e,16)},_e(o,"wheel",qe),c=[o,s,a,l],_e(s,"scroll",qe);var r,p=l.style,g=p.borderTop;p.borderTop="1px solid #000",r=Te(l),be.m=Math.round(r.top+be.sc())||0,ye.m=Math.round(r.left+ye.sc())||0,g?p.borderTop=g:p.removeProperty("border-top"),v=setInterval(We,200),n.delayedCall(.5,(function(){return _=0})),_e(s,"touchcancel",N),_e(l,"touchstart",N),Pe(_e,s,"pointerdown,touchstart,mousedown",(function(){return x=1})),Pe(_e,s,"pointerup,touchend,mouseup",(function(){return x=0})),y=n.utils.checkPrefix("transform"),nt.push(y),i=z(),u=n.delayedCall(.2,Ke).pause(),C=[s,"visibilitychange",function(){var e=o.innerWidth,t=o.innerHeight;s.hidden?(w=e,k=t):w===e&&k===t||He()},s,"DOMContentLoaded",Ke,o,"load",function(){return L||Ke()},o,"resize",He],U(_e)}return i},e.defaults=function(e){for(var t in e)ze[t]=e[t]},e.kill=function(){I=0,Fe.slice(0).forEach((function(e){return e.kill(1)}))},e.config=function(e){"limitCallbacks"in e&&(M=!!e.limitCallbacks);var t=e.syncInterval;t&&clearInterval(v)||(v=t)&&setInterval(We,t),"autoRefreshEvents"in e&&(U(Re)||U(_e,e.autoRefreshEvents||"none"),E=-1===(e.autoRefreshEvents+"").indexOf("resize"))},e.scrollerProxy=function(e,t){var r=d(e)[0],n=A.indexOf(r),i=q(r);~n&&A.splice(n,i?6:2),i?R.unshift(o,t,l,t,a,t):R.unshift(r,t)},e.matchMedia=function(e){var t,r,n,i,s;for(r in e)n=je.indexOf(r),i=e[r],S=r,"all"===r?i():(t=o.matchMedia(r),t&&(t.matches&&(s=i()),~n?(je[n+1]=ee(je[n+1],i),je[n+2]=ee(je[n+2],s)):(n=je.length,je.push(r,i,s),t.addListener?t.addListener(Je):t.addEventListener("change",Je)),je[n+3]=t.matches)),S=0;return je},e.clearMatchMedia=function(e){e||(je.length=0),e=je.indexOf(e),e>=0&&je.splice(e,4)},e}();gt.version="3.7.0",gt.saveStyles=function(e){return e?d(e).forEach((function(e){if(e&&e.style){var t=Ze.indexOf(e);t>=0&&Ze.splice(t,5),Ze.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),n.core.getCache(e),S)}})):Ze},gt.revert=function(e,t){return Ge(!e,t)},gt.create=function(e,t){return new gt(e,t)},gt.refresh=function(e){return e?He():Ke(!0)},gt.update=tt,gt.maxScroll=function(e,t){return V(e,t?ye:be)},gt.getScrollFunc=function(e,t){return X(d(e)[0],t?ye:be)},gt.getById=function(e){return De[e]},gt.getAll=function(){return Fe.slice(0)},gt.isScrolling=function(){return!!L},gt.addEventListener=function(e,t){var r=Xe[e]||(Xe[e]=[]);~r.indexOf(t)||r.push(t)},gt.removeEventListener=function(e,t){var r=Xe[e],n=r&&r.indexOf(t);n>=0&&r.splice(n,1)},gt.batch=function(e,t){var r,i=[],o={},s=t.interval||.016,a=t.batchMax||1e9,l=function(e,t){var r=[],i=[],o=n.delayedCall(s,(function(){t(r,i),r=[],i=[]})).pause();return function(e){r.length||o.restart(!0),r.push(e.trigger),i.push(e),a<=r.length&&o.progress(1)}};for(r in t)o[r]="on"===r.substr(0,2)&&$(t[r])&&"onRefreshInit"!==r?l(r,t[r]):t[r];return $(a)&&(a=a(),_e(gt,"refresh",(function(){return a=t.batchMax()}))),d(e).forEach((function(e){var t={};for(r in o)t[r]=o[r];t.trigger=e,i.push(gt.create(t))})),i},gt.sort=function(e){return Fe.sort(e||function(e,t){return-1e6*(e.vars.refreshPriority||0)+e.start-(t.start+-1e6*(t.vars.refreshPriority||0))})},W()&&n.registerPlugin(gt)}}]);
//# sourceMappingURL=anime-demo~gallery~navigation-demo~parallax~s-progress.39f9502b.js.map