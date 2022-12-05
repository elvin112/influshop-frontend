<template>
  <header>
    <TheHeader />
  </header>

  <div class="wrapper">
    <TheSidebar />
    <span v-if="isLoading" class="error-msg">
      <LoadingSpinner class="color-primary-3"
    /></span>

    <p v-else-if="!isLoading && errorMsg" class="error-msg">{{ errorMsg }}</p>
    <div class="inner-wrapper" v-else>
      <div class="influencer-info">
        <div class="influencer-info__profile">
          <img
            src="../assets/img/no-img-placeholder.jpeg"
            alt="An influencer."
            class="avatar"
          />
          <h2 class="influencer-name">{{ influencerName }}</h2>
        </div>

        <span
          class="influencer-info__report"
          @click="
            {
            }
          "
        >
          <svg class="report__icon">
            <use xlink:href="../assets/img/sprite.svg#icon-warning" />
          </svg>
        </span>
      </div>
      <router-link
        class="pinned-item-router"
        :to="
          pinnedItem?.type === 'itemGroup'
            ? '/itemGroupDetail/' + pinnedItem?.id
            : '/itemDetail/' + pinnedItem?.id
        "
      >
        <div class="pinned-item mb-sm" v-if="pinnedItem">
          <img
            :src="loadItemImg(pinnedItem.imageLocation)"
            alt="An item."
            class="pinned-item__img"
          />
          <div class="pinned-item__title-description">
            <p class="pinned-item__title">{{ pinnedItem.name }}</p>
            <p class="pinned-item__description">
              {{ pinnedItem.description }}
            </p>
          </div>
        </div>
      </router-link>
      <div class="item-container">
        <div class="item" v-for="item in items">
          <img
            :key="item.id"
            :src="loadItemImg(item.imageLocation)"
            alt="An item."
            class="item__picture"
          />

          <span class="item__add-to-favorite">
            <svg class="heart-icon">
              <use xlink:href="../assets/img/sprite.svg#icon-heart" />
            </svg>
          </span>

          <div class="item-info">
            <div class="item-info__title-stars">
              <p class="item-info__title">{{ item.name }}</p>
              <span class="item-info__star">
                <svg class="star-icon">
                  <use xlink:href="../assets/img/sprite.svg#icon-star-full" />
                </svg>
                {{
                  item.averageStars === null
                    ? 0
                    : parseFloat(item.averageStars).toFixed(1)
                }}
              </span>
            </div>
            <div class="item-info__price-availability">
              <p class="item-info__price">${{ item.price }}</p>
              <p
                class="item-info__availability"
                :class="{ soldOut: !item.available }"
              >
                {{ item.available ? "In Stock" : "Sold Out" }}
              </p>
            </div>
          </div>
          <router-link
            :to="
              item.type === 'itemGroup'
                ? '/itemGroupDetail/' + item.id
                : '/itemDetail/' + item.id
            "
            class="item__view-detail btn btn--primary"
            >View in Detail</router-link
          >
        </div>
      </div>
    </div>
  </div>
  <TheFooter />
</template>

<script>
import { isProxy, toRaw } from "vue";
import { Cloudinary } from "cloudinary-core"; // If your code is for ES6 or higher
var cl = new Cloudinary({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  secure: true,
});

export default {
  data() {
    return {
      isLoading: true,
      errorMsg: "",
      items: [],
      pinnedItem: null,
      influencerName: null,
      itemImages: [],
    };
  },
  async mounted() {
    window.scrollTo(0, 0);
    this.isLoading = true;
    this.errorMsg = null;
    await this.loadProfile();
    this.isLoading = false;
    this.loadPinnedItem();
  },
  methods: {
    loadPinnedItem() {
      for (let index = 0; index < this.items.length; index++) {
        const item = this.items[index];
        if (item.isPinned) {
          this.pinnedItem = item;
          return;
        }
      }
    },
    loadItemImg(imgLoc) {
      return cl.image(imgLoc).src;
    },
    async loadProfile() {
      const influencerUsername = this.$route.params.influencerUsername;
      this.influencerName = influencerUsername;

      const response = await fetch(
        `http://localhost:8080/api/v1/item-ops/items/${influencerUsername}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        this.errorMsg = "Something went wrong - try again later!";
      } else {
        const data = await response.json();
        this.items = data.items;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "./InfluencerPage.module.scss";
</style>
