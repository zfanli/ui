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
    path: "/scrolling-progress",
    name: "ScrollingProgress",
    component: () =>
      import(
        /* webpackChunkName: "s-progress" */ "../components/ScrollingProgress.vue"
      ),
  },
  {
    path: "/timeline",
    name: "Timeline",
    component: () =>
      import(/* webpackChunkName: "timeline" */ "../components/Timeline.vue"),
  },
  {
    path: "/animation-demo",
    name: "AnimationDemo",
    component: () =>
      import(/* webpackChunkName: "anime-demo" */ "../views/AnimationDemo.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
