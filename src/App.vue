<template>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";

export default {
  created() {
    this.$store.dispatch("auth/tryLogin");

    if (this.$store.getters["auth/token"]) {
      if (this.$store.getters["auth/isInfluencer"] === "false")
        this.$store.dispatch("cart/fetchUserCart");
    }
  },
};
</script>
