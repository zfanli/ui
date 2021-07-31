import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/album",
    name: "Album",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "album" */ "../components/Album.vue"),
  },

  {
    path: "/timeline",
    name: "Timeline",
    component: () =>
      import(/* webpackChunkName: "timeline" */ "../components/Timeline.vue"),
  },
  {
    path: "/loading",
    name: "Loading",
    component: () =>
      import(/* webpackChunkName: "loading" */ "../views/LoadingDemo.vue"),
  },
  {
    path: "/parallax",
    name: "Parallax",
    component: () =>
      import(/* webpackChunkName: "parallax" */ "../components/Parallax.vue"),
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: () =>
      import(/* webpackChunkName: "gallery" */ "../views/GalleryDemo.vue"),
  },
  {
    path: "/scrolling-progress",
    name: "ScrollingProgress",
    component: () =>
      import(
        /* webpackChunkName: "s-progress" */ "../views/ScrollingProgress.vue"
      ),
  },
  {
    path: "/animation-demo",
    name: "AnimationDemo",
    component: () =>
      import(/* webpackChunkName: "anime-demo" */ "../views/AnimationDemo.vue"),
  },
  {
    path: "/navigation",
    name: "Navigation",
    component: () =>
      import(
        /* webpackChunkName: "navigation-demo" */ "../views/NavigationDemo.vue"
      ),
  },
  {
    path: "/text-effect-hover-transition",
    name: "TextEffectHoverTransition",
    component: () =>
      import(
        /* webpackChunkName: "text-effect-hover-transition" */ "../views/TextEffectHoverTransition.vue"
      ),
  },
  {
    path: "/parallax-pure-css",
    name: "ParallaxPureCss",
    component: () =>
      import(
        /* webpackChunkName: "parallax-pure-css" */ "../views/ParallaxPureCss.vue"
      ),
  },
  {
    path: "/mouse-move-parallax",
    name: "MouseMoveParallax",
    component: () =>
      import(
        /* webpackChunkName: "mouse-move-parallax" */ "../views/MouseMoveParallax.vue"
      ),
  },
  {
    path: "/markdown-editor",
    name: "MarkdownEditor",
    component: () =>
      import(
        /* webpackChunkName: "markdown-editor" */ "../views/MarkdownEditor.vue"
      ),
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(_, __, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
