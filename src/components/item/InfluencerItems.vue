<template>
  <h2 v-if="isLoading">Loading...</h2>
  <div class="wrapper">
    <div class="introductory">
      <h3 class="introductory__header-title">TYPE</h3>
      <h3 class="introductory__header-title">NAME</h3>
      <h3 class="introductory__header-title">PRICE</h3>
      <h3 class="introductory__header-title">AVAILABLE</h3>
      <h3 class="introductory__header-title">ACTIONS</h3>
    </div>
    <hr />
    <div class="items">
      <ul>
        <li v-for="item in influencerItems">
          <p>{{ item.type === "item" ? "item" : "item group" }}</p>
          <p>{{ item.name }}</p>
          <p>{{ item.price }}$</p>
          <p class="item__availability">{{ item.available }}</p>
          <p>ACTIONS</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    influencerItems() {
      return this.$store.getters["influencer/influencerItems"];
    },

    itemCounts() {
      return this.influencerItems.length;
    },
  },

  mounted() {
    this.isLoading = true;
    this.fetchItems();
    this.isLoading = false;
  },
  methods: {
    fetchItems() {
      this.$store.dispatch("influencer/fetchInfluencerItems");
    },
  },
};
</script>

<style scoped lang="scss">
@import "./InfluencerItems.module.scss";
</style>
