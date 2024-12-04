import { createRouter, createWebHashHistory } from "vue-router";
import AboutView from "../views/AboutView.vue";
import Segment from "../views/Segment.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: AboutView,
    },
    {
      path: "/segment",
      component: Segment,
    },
  ],
});

export default router;
