import { createRouter, createWebHistory } from "vue-router";
import Signin from "../pages/auth/Signin.vue";
import Signup from "../pages/auth/Singup.vue";
import Main from "../pages/Main.vue";
import UserSettings from "../pages/UserSettings.vue";
import Settings from "../components/settings/Settings.vue";
import AddItem from "../components/item/AddItem.vue";
import StoreSettings from "../components/item/StoreSettings.vue";
import AccountSettings from "../components/settings/AccountSettings.vue";
import ItemDetail from "../pages/ItemDetail.vue";
import ItemGroupDetail from "../pages/ItemGroupDetail.vue";
import InfluencerPage from "../pages/InfluencerPage.vue";
import Cart from "../pages/Cart.vue";
import Favorites from "../pages/Favorites.vue";

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
            {
              path: "/userSettings/settings/account",
              name: "accountSettings",
              component: AccountSettings,
            },
          ],
        },
      ],
    },
    {
      path: "/itemDetail/:itemId",
      name: "itemDetail",
      component: ItemDetail,
    },
    {
      path: "/itemGroupDetail/:itemGroupId",
      name: "itemGroupDetail",
      component: ItemGroupDetail,
    },
    {
      path: "/influencer/:influencerUsername",
      name: "influencerPage",
      component: InfluencerPage,
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: Favorites,
    },
  ],
  linkActiveClass: "active",
});

export default router;
