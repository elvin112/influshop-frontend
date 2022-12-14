<template>
  <header>
    <TheHeader />
    <Transition>
      <ErrorMsg v-if="showErrMsg" :msg="errMsg" />
    </Transition>
    <Transition>
      <SimpleAlertMsg v-if="showAlertMsg" :msg="alertMsg" />
    </Transition>
  </header>

  <div class="wrapper">
    <InfluencerReport
      v-if="bringInfluencerReportCard"
      :influencerUsername="influencerName"
    />

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
          @click="influencerReportPopupHandler"
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

          <span
            v-show="item.isFavorite"
            class="item__add-to-favorite"
            @click="addItemToFavorites(item.id, false)"
          >
            <svg class="heart-icon filled">
              <use xlink:href="../assets/img/sprite.svg#icon-heart" />
            </svg>
          </span>

          <span
            class="item__add-to-favorite"
            v-show="!item.isFavorite"
            @click="addItemToFavorites(item.id, true)"
          >
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

import InfluencerReport from "../components/report/InfluencerReport.vue";

var cl = new Cloudinary({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  secure: true,
});

export default {
  data() {
    return {
      isLoading: true,
      errorMsg: "",
      errMsg: "Something went wrong!",
      alertMsg: "Process done!",
      showAlertMsg: false,

      showErrMsg: false,
      items: [],
      pinnedItem: null,
      influencerName: null,
      itemImages: [],
      bringInfluencerReportCard: false,
    };
  },
  provide() {
    return {
      closeInfluencerReportPopup: this.closeInfluencerReportPopup,
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
    influencerReportPopupHandler() {
      this.bringInfluencerReportCard = true;
    },
    closeInfluencerReportPopup(result) {
      if (result === "reported") {
        this.alertMsg = "Influencer successfully reported.";
        this.showAlertMsg = true;
        setTimeout(() => {
          this.showAlertMsg = false;
        }, 5000);
      } else if (result === "unreported") {
        this.alertMsg = "Influencer successfully unreported.";
        this.showAlertMsg = true;
        setTimeout(() => {
          this.showAlertMsg = false;
        }, 5000);
      } else if (result === "error") {
        this.errMsg = "Influencer could not be reported!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
      this.bringInfluencerReportCard = false;
    },
    async addItemToFavorites(id, mode) {
      if (this.$store.getters["auth/token"]) {
        if (this.$store.getters["auth/isInfluencer"] === "true") {
          return;
        }
      } else {
        return;
      }
      const payload = {
        itemId: id,
        isAddToFavorite: mode,
      };
      try {
        const response = await this.$store.dispatch(
          "favorite/addItemToFavorites",
          payload
        );

        if (!response.ok) {
          let errMsg = null;
          errMsg = await response.json();
          throw errMsg;
        } else {
          // alert("Item added!");

          for (let index = 0; index < this.items.length; index++) {
            if (this.items[index].id === id) {
              console.log(this.items[index]);
              this.items[index].isFavorite = !this.items[index].isFavorite;
            }
          }
        }
      } catch (error) {
        this.errMsg = error.message || "Item could not be added!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
    },
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

      let response = null;
      if (this.$store.getters["auth/token"]) {
        if (this.$store.getters["auth/isInfluencer"] === "false") {
          response = await fetch(
            `http://localhost:8080/api/v1/item-ops/items/${influencerUsername}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                // uncomment below after fix in the backend
                // Authorization: "Bearer " + this.$store.getters["auth/token"],
              },
            }
          );
        }
      }
      if (response === null) {
        response = await fetch(
          `http://localhost:8080/api/v1/item-ops/items/${influencerUsername}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (!response.ok) {
        this.errorMsg = "Something went wrong - try again later!";
      } else {
        const data = await response.json();
        this.items = data.items;
      }
    },
  },
  components: {
    InfluencerReport,
  },
};
</script>

<style scoped lang="scss">
@import "./InfluencerPage.module.scss";
</style>
