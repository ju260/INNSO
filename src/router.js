import Vue from "vue";
import Router from "vue-router";
import Home from "./views/V1.vue";
import JuTabDatas from "./views/JuTabDatas.vue";
import About from "./views/V2.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "v1",
      component: Home
    },
    {
      path: "/v2",
      name: "v2",
      component: About
    },
    {
      path: "/v3",
      name: "v3",
      component: JuTabDatas

      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    }
  ]
});
