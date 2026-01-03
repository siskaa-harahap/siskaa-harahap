import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/LoginPage.vue";
import Dashboard from "../components/Dashboard.vue";
import RegisterPage from "../components/RegisterPage.vue";  

const routes = [
  { path: "/", redirect: "/LoginPage" },
  { path: "/LoginPage", name: "LoginPage", component: LoginPage },
  { path: "/RegisterPage", name: "RegisterPage", component: RegisterPage },
  { path: "/Dashboard", name: "Dashboard", component: Dashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// ===== ROUTE GUARD =====
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  // Kalau mau akses dashboard tapi belum login → redirect ke login
  if (to.name === "Dashboard" && !token) {
    next("/LoginPage");
  } else {
    next();
  }
});

export default router;
