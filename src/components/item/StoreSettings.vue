<template>
  <div class="wrapper-store-settings">
    <div class="your-items-container">
      <h2 class="your-items-title">Your Items</h2>
      <KeepAlive>
        <router-link
          to="/userSettings/settings/store/addNew"
          class="btn btn--primary btn-addNew"
          >Add New</router-link
        >
      </KeepAlive>
    </div>
    <br />
    <router-view></router-view>

    <InfluencerItems />
  </div>
</template>

<script>
import InfluencerItems from "./InfluencerItems.vue";

export default {
  components: { InfluencerItems },
};
</script>

<style scoped lang="scss">
@import "./StoreSettings.module.scss";
</style>
