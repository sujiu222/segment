import { createRouter, createWebHashHistory } from "vue-router";
import AboutView from "../views/AboutView.vue";
import Segment_2 from "../views/Segment_2.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: AboutView,
    },
    {
      path: "/segment",
      component: Segment_2,
    },
  ],
});

export default router;
