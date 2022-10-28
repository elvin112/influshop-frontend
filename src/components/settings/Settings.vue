<template>
  <nav class="main-tab">
    <ul class="main-tab-group">
      <li class="main-tab-group__item">
        <router-link to="/">Account Setting</router-link>
      </li>
      <li class="main-tab-group__item">
        <router-link to="/">Login & Security</router-link>
      </li>
      <li class="main-tab-group__item">
        <router-link to="/userSettings/settings/store">My Store</router-link>
      </li>
    </ul>
  </nav>

  <router-view></router-view>
</template>

<script>
export default {
  mounted() {
    this.$router.push("/userSettings/settings/store");
  },
};
</script>

<style scoped lang="scss">
@import "./Settings.module.scss";
</style>
