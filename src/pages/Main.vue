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
            <p class="item-info__influencer-link">
              by
              <router-link :to="'/influencer/' + item.influencerName"
                >{{ item.influencerName }}
              </router-link>
            </p>
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
        <span v-if="isLoading" class="error-msg">
          <LoadingSpinner class="color-primary-3"
        /></span>
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
      influencerName: null,
      currentPage: 1,
    };
  },
  created() {},

  async mounted() {
    this.isLoading = true;
    this.errorMsg = null;
    await this.loadItems();
    this.isLoading = false;
    window.addEventListener("scroll", this.loadNewItems);
  },
  methods: {
    async loadNewItems(ev) {
      let sendRequest = false;
      window.onscroll = (ev) => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          this.loadItems();
        }
      };
      if (sendRequest) {
        await this.loadItems();
      }
    },
    loadItemImg(imgLoc) {
      return cl.image(imgLoc).src;
    },
    async loadItems() {
      const response = await fetch(
        `http://localhost:8080/api/v1/item-ops/main-page-items/${this.currentPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        this.errorMsg = "Something weng wrong - try again later!";
      } else {
        const data = await response.json();
        if (this.currentPage >= 2) {
          if (data.item.length !== 0) {
            this.items = this.items.concat(data.item);
            this.currentPage++;
            return;
          }
        }
        if (this.currentPage === 1) {
          this.items = data.item;
          this.currentPage++;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "./Main.module.scss";
</style>
