import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import Dashboard from "../pages/Dashboard.vue";
import EventForm from "../pages/EventForm.vue";
import Error from "../pages/Error.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", redirect: "dashboard" },
      { path: "dashboard", component: Dashboard },
      { path: "event/new", component: EventForm },
      { path: "event/:id/edit", component: EventForm, props: true },
      {
        path: "/error",
        name: "Error",
        component: Error,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
