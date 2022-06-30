import { createRouter, createWebHistory, Router } from "vue-router";

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("@/views/index.vue"),
    children: [
      {
        path: "/dynamic/:lowid",
        name: "dynamic",
        component: () => import("@/views/dynamic.vue"),
      },
      {
        path: "/tool",
        name: "tool",
        component: () => import("@/views/tool.vue"),
      },
    ],
  },
];
const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
