import { createRouter, createWebHistory } from "vue-router";
import Signin from "../pages/auth/Signin.vue";
import Signup from "../pages/auth/Singup.vue";
import Main from "../pages/Main.vue";
import UserSettings from "../pages/UserSettings.vue";
import Settings from "../components/settings/Settings.vue";
import AddItem from "../components/item/AddItem.vue";
import StoreSettings from "../components/item/StoreSettings.vue";

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
    {
      path: "/userSettings",
      name: "userSettings",
      component: UserSettings,
      children: [
        {
          path: "/userSettings/settings",
          name: "settings",
          component: Settings,
          children: [
            {
              path: "/userSettings/settings/store",
              name: "storeSettings",
              component: StoreSettings,
              children: [
                {
                  path: "/userSettings/settings/store/addNew",
                  name: "addNewItem",
                  component: AddItem,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  linkActiveClass: "active",
});

export default router;
