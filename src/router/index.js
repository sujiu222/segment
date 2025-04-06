import { createRouter, createWebHashHistory } from "vue-router";
import AboutView from "../views/AboutView.vue";
import Segment_2 from "../views/Segment_2.vue";
import demo from "../views/Demo.vue";
import Generate from "../views/Generate.vue";
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
    {
      path: "/demo",
      component: demo,
    },
    {
      path: "/generate",
      component: Generate,
    },
  ],
});

export default router;
