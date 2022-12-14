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
  <div class="searchbar-wrapper" @blur="discardSearchWindow">
    <div class="drop-down" v-show="isDropDownOpen">
      <nav>
        <ul>
          <!-- :to="'/influencer/' + elem.username" -->
          <router-link
            :to="
              selectedSearchCat === 'influencer'
                ? 'influencer/' + elem?.username
                : 'itemDetail/' + elem?.id
            "
            v-for="(elem, index) in searchResult"
            :key="elem.index"
          >
            <li>
              <p>
                {{
                  selectedSearchCat === "influencer"
                    ? elem?.username
                    : elem?.itemName
                }}
              </p>
            </li>
          </router-link>
        </ul>
      </nav>
    </div>
    <div class="input-control">
      <span class="search-icon">
        <svg class="search-icon__icon">
          <use xlink:href="../assets/img/sprite.svg#icon-search" />
        </svg>
      </span>
      <input
        @click="expandMenuHandler()"
        type="text"
        placeholder="Search for anything"
        class="search-input"
        v-model="searchedText"
      />
      <select name="" id="" class="search-by" v-model="selectedSearchCat">
        <option value="influencer">Influencer</option>
        <option value="item">Item</option>
      </select>
    </div>
  </div>
  <div class="wrapper" @click="discardSearchWindow()">
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
let timer;
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
      isDropDownOpen: false,
      searchedText: "",
      selectedSearchCat: "influencer",
      searchResult: [],
    };
  },

  watch: {
    // whenever question changes, this function will run
    searchedText(newQuestion, oldQuestion) {
      this.searchChangeHandler();
    },
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
    searchChangeHandler(event) {
      clearTimeout(timer);
      this.searchResult = null;
      if (this.selectedSearchCat === "influencer") {
        timer = setTimeout(async () => {
          const response = await fetch(
            `http://localhost:8080/api/v1/search/influencer?query=${this.searchedText}&page=1`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.$store.getters["auth/token"], //accessToken contain bearer value.
              },
            }
          );
          if (!response.ok) {
            throw Error();
          } else {
            const data = await response.json();
            this.searchResult = data.result;
          }
        }, 400);
      } else if (this.selectedSearchCat === "item") {
        timer = setTimeout(async () => {
          const response = await fetch(
            `http://localhost:8080/api/v1/search/item?query=${this.searchedText}&page=1`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.$store.getters["auth/token"], //accessToken contain bearer value.
              },
            }
          );
          if (!response.ok) {
            throw Error();
          } else {
            const data = await response.json();
            this.searchResult = data.result;
          }
        }, 400);
      }
    },
    expandMenuHandler() {
      this.isDropDownOpen = true;
    },
    discardSearchWindow() {
      this.isDropDownOpen = false;
    },
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

.searchbar-wrapper {
  background-color: var(--color-primary--3);
  height: 4.7rem;
  position: relative;
  z-index: 70;

  .input-control {
    width: 33.5rem;
    height: 3.1rem;
    background-color: white;
    transform: translateX(100%) translateY(112%);
    position: relative;
    display: grid;
    grid-template-columns: 6% 65% 25%;
    align-items: center;
    text-align: center;
    border-radius: 4px;
    z-index: 99;
    .search-icon {
      display: inline-block;
      &__icon {
        width: 1.4rem;
        height: 1.4rem;
      }
    }
    .search-input {
      height: 100%;
      border: none;
      font-family: "Montserrat", sans-serif;
      font-size: 0.95rem;
      font-weight: 500;
      caret-color: var(--color-primary);
      padding-left: 0.4rem;
      &:focus {
        outline: none;
      }
    }
  }
  .input-control::after {
    content: "";
    position: absolute;
    left: 70%;
    height: 35px;
    width: 0.1rem;
    background-color: var(--color-grey-light-6);
  }
  a {
    color: black;
  }

  .search-by {
    border: none;
    font-family: "Montserrat", sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--color-grey-light-4);

    &:focus {
      outline: none;
      color: black;
    }
  }

  .drop-down {
    background-color: white;
    width: 33.5rem;
    min-height: 11rem;
    max-height: 11rem;
    overflow: auto;
    border: 1px solid white;
    position: absolute;
    left: 50%;
    transform: translateX(-40%) translateY(58%);

    ul {
      list-style: none;
    }

    a {
      text-decoration: none;
    }

    li {
      border-bottom: 1px solid var(--color-grey-light-6);
      padding: 0.7rem;
    }
    li:not(:last-child) {
      border-bottom: none;
    }

    p {
      margin-left: 2rem;
      font-size: 1rem;
      font-family: "Montserrat", sans-serif;
      font-size: 0.85rem;
    }
  }
}
</style>
