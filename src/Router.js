import { createRouter, createWebHistory } from "vue-router";
import Calculator from "./components/Calculator.vue";
import Contact from "./components/Contact.vue";

const routes = [
  { path: "/", component: Calculator },
  { path: "/contact", component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
