<template>
  <div class="wrapper-store-settings">
    <div class="your-items-container">
      <h2 class="your-items-title">Your Items</h2>
      <router-link
        to="/userSettings/settings/store/addNew"
        class="btn btn--primary btn-addNew"
        >Add New</router-link
      >
    </div>
    <br />
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
@import "./StoreSettings.module.scss";
</style>
