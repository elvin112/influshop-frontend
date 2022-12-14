<template>
  <div class="header-wrapper">
    <!-- <div class="header-1">
      <div class="download-app">
        <svg class="download-app__icon">
          <use xlink:href="../../assets/img/sprite.svg#icon-mobile" />
        </svg>
        <span>Download Influshop App Here</span>
      </div>
      <div class="menu">
        <nav class="menu-nav">
          <ul>
            <li class="menu-nav__item--1">
              <router-link to="/">Home</router-link>
            </li>
            <li class="menu-nav__item--2">
              <router-link to="/">Contact Us</router-link>
            </li>
            <li class="menu-nav__item--3">
              <router-link to="/">About Us</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div> -->
    <div class="header-2">
      <BaseLogo />
      <nav class="header-nav">
        <ul>
          <router-link to="/signin" v-if="!isAuthenticated">
            <li class="login-register">
              <p>Login</p>
            </li>
          </router-link>
          <router-link to="/signup" v-if="!isAuthenticated">
            <li class="login-register">
              <p>Register</p>
            </li>
          </router-link>

          <router-link to="/favorites">
            <li class="header-nav__favorite" v-if="isUser">
              <svg class="favorite-icon">
                <use xlink:href="../../assets/img/sprite.svg#icon-heart" />
              </svg>
              <span
                class="favorite-icon__item-count"
                v-show="favoriteLength > 0"
                >{{ favoriteLength }}</span
              >
            </li>
          </router-link>
          <router-link to="/cart">
            <li class="header-nav__cart" v-if="isUser">
              <svg class="cart-icon">
                <use
                  xlink:href="../../assets/img/sprite.svg#icon-shopping_bag"
                />
              </svg>
              <span class="cart-icon__item-count" v-show="cartLength > 0">{{
                cartLength
              }}</span>
            </li>
          </router-link>
          <li class="header-nav__cart avatar" v-if="isUser || isInfluencer">
            <UserMenu />
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import UserMenu from "./UserMenu.vue";

export default {
  components: { UserMenu },
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    isUser() {
      if (this.$store.getters["auth/token"]) {
        if (this.$store.getters["auth/isInfluencer"] === "false") return true;
      }
      return false;
    },
    isInfluencer() {
      if (this.$store.getters["auth/token"]) {
        if (this.$store.getters["auth/isInfluencer"] === "true") return true;
      }
      return false;
    },
    favoriteLength() {
      return this.$store.getters["favorite/favoriteLength"];
    },
    cartLength() {
      return this.$store.getters["cart/cartLength"];
    },
  },
};
</script>

<style scoped lang="scss">
@import "TheHeader.module.scss";

a {
  text-decoration: none;
}

.login-register {
  padding: 1rem;
  color: black;
}

.login-register:hover {
  padding: 1rem;
  color: rgb(126, 123, 123);
}
</style>
