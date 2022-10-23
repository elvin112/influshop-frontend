import { createRouter, createWebHistory } from "vue-router";
import Signin from "../pages/Signin.vue";
import Signup from "../pages/Singup.vue";
import Main from "../pages/Main.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/main",
    },
    { path: "/main", name: "main", component: Main },
    {
      path: "/signin",
      name: "signin",
      component: Signin,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
  ],
});

export default router;
