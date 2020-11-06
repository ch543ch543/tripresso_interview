import Vue from "vue";
import VueRouter from "vue-router";
import Groupdata from "../views/Groupdata.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "groupdata",
    component: Groupdata
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
