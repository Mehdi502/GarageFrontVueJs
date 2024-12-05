import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/Login.vue";
import CarManagement from "../components/CarManagement.vue"; // Importe le composant CarManagement

const routes = [
  { path: "/", redirect: "/login" }, // Redirige la route "/" vers "/login"
  { path: "/login", component: LoginPage }, // Définit la route pour le composant Login
  { path: "/car", component: CarManagement }, // Route pour le composant CarManagement
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
