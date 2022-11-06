<template>
  <h1>Influencer Items!</h1>

  <h2 v-if="isLoading">Loading...</h2>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },

  mounted() {
    this.fetchItems();
  },
  methods: {
    fetchItems() {
      this.isLoading = true;
      this.$store.dispatch("influencer/fetchInfluencerItems");
      this.isLoading = false;
    },
  },
};
</script>
