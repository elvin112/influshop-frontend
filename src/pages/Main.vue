<template>
  <header>
    <TheHeader />
  </header>
  <Transition>
    <ErrorMsg v-if="showErrMsg" :msg="errMsg" />
  </Transition>
  <Transition>
    <SimpleAlertMsg v-if="showAlertMsg" :msg="alertMsg" />
  </Transition>
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
            v-show="!item.isFavorite"
            class="item__add-to-favorite"
            @click="addItemToFavorites(item.id, true)"
          >
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
  provide() {
    return {
      closeErrMsg: this.closeErrMsg,
      closeAlertMsg: this.closeAlertMsg,
    };
  },
  data() {
    return {
      isLoading: true,
      errorMsg: "",
      items: [],
      influencerName: null,
      currentPage: 1,
      alertMsg: "Process done!",
      showAlertMsg: false,
      errMsg: "Something went wrong!",
      showErrMsg: false,
    };
  },

  async mounted() {
    this.isLoading = true;
    this.errorMsg = null;
    await this.loadItems();
    this.isLoading = false;
    window.addEventListener("scroll", this.loadNewItems);

    this.$store.dispatch("cart/fetchUserCart");
    this.$store.dispatch("favorite/fetchUserFavorites");
  },
  methods: {
    closeErrMsg() {
      this.showErrMsg = false;
    },
    closeAlertMsg() {
      this.showAlertMsg = false;
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
          if (mode) {
            this.alertMsg = "Item added to favorites";
          } else {
            this.alertMsg = "Item removed from favorites";
          }
          this.showAlertMsg = true;
          for (let index = 0; index < this.items.length; index++) {
            if (this.items[index].id === id) {
              console.log(this.items[index]);
              this.items[index].isFavorite = !this.items[index].isFavorite;
            }
          }
          setTimeout(() => {
            this.showAlertMsg = false;
          }, 5000);
        }
      } catch (error) {
        this.errMsg = error?.message || "Item could not be added!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
    },

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
      let response = null;
      if (this.$store.getters["auth/token"]) {
        if (this.$store.getters["auth/isInfluencer"] === "false") {
          response = await fetch(
            `http://localhost:8080/api/v1/item-ops/main-page-items/${this.currentPage}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.$store.getters["auth/token"],
              },
            }
          );
        }
      }
      if (response === null) {
        response = await fetch(
          `http://localhost:8080/api/v1/item-ops/main-page-items/${this.currentPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

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
