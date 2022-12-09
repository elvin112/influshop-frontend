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
    <div class="your-order">
      <p class="your-order__title">Your Favorites</p>
      <hr />
      <div class="cart-content-container">
        <div v-show="favoriteLength <= 0" class="cart-is-empty">
          <h2>Your favorites list is empty</h2>
          <p>
            You are not watching anything yet. Click &#10084; TO ADD WATCHLIST,
            to save interesting offers.
          </p>
        </div>

        <div
          class="cart-content mt-sm"
          v-for="item in userFavorites"
          :key="item.id"
        >
          <div class="cart-content__item-img">
            <img
              :src="loadItemImg(item.image)"
              alt="An item."
              class="item__picture"
            />
          </div>
          <div class="cart-content__item-info">
            <div class="title-icon">
              <router-link :to="'/itemDetail/' + item.id"
                ><p>{{ item.itemName }}</p></router-link
              >

              <span
                class="delete-item"
                @click="removeItemFromFavorites(item.id)"
              >
                <svg class="delete-icon-bin">
                  <use xlink:href="../assets/img/sprite.svg#icon-bin" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer>
    <TheFooter />
  </footer>
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

  async mounted() {},
  computed: {
    userFavorites() {
      return this.$store.getters["favorite/userFavorites"];
    },

    favoriteLength() {
      return this.$store.getters["favorite/favoriteLength"];
    },
  },

  methods: {
    async increaseItemQuantity(id, quantity) {
      try {
        const response = await this.$store.dispatch("cart/increaseQuantity", {
          id: id,
          quantity: quantity,
        });

        if (!response.ok) {
          let errMsg = null;
          errMsg = await response.json();
          console.log(errMsg);
          throw errMsg;
        } else {
          //
        }
      } catch (error) {
        this.errMsg = "Item's quantity could not be changed!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
    },

    async removeItemFromFavorites(id) {
      try {
        const response = await this.$store.dispatch("favorite/removeItem", {
          id: id,
        });

        if (!response.ok) {
          let errMsg = null;
          errMsg = await response.json();
          console.log(errMsg);
          throw errMsg;
        } else {
          // alert("Item added!");
          this.alertMsg = "Item removed from the favorites";
          this.showAlertMsg = true;
          setTimeout(() => {
            this.showAlertMsg = false;
          }, 5000);
        }
      } catch (error) {
        this.errMsg = "Item could not be removed!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
    },
    loadItemImg(imgLoc) {
      return cl.image(imgLoc).src;
    },

    closeErrMsg() {
      this.showErrMsg = false;
    },
    closeAlertMsg() {
      this.showAlertMsg = false;
    },
  },
  data() {
    return {
      alertMsg: "Process done!",
      showAlertMsg: false,
      errMsg: "Something went wrong!",
      showErrMsg: false,
    };
  },
};
</script>

<style scoped lang="scss">
@import "./Favorites.module.scss";
</style>
