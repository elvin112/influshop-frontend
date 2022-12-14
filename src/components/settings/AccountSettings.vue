<template>
  <Transition>
    <ErrorMsg v-if="showErrMsg" :msg="errMsg" />
  </Transition>
  <Transition>
    <SimpleAlertMsg v-if="showAlertMsg" :msg="alertMsg" />
  </Transition>
  <CADeletionPopup v-if="bringCADeletionCard" :caType="caType" />

  <CAUpdatePopup
    v-if="bringCAUpdateCard"
    :cardId="cardId"
    :address="address"
    :card="card"
    :caType="caType"
  />

  <AccountDeletionPopup v-if="bringAccDeletionPopup" />

  <div class="wrapper">
    <div class="profile">
      <div class="profile-img">
        <p>Profile picture</p>

        <span class="mt-sm profile-img-hint">
          <!-- <img src="./../../assets/img/no-img-placeholder.jpeg" alt="" /> -->

          <div class="image-uploader">
            <label for="file-input-1" ref="fileLabel1" class="fileLabel1">
              Change Image
              <input id="file-input-1" type="file" @change="preview" />
            </label>

            <img
              ref="frame1"
              src="../../assets/img/no-img-placeholder.jpeg"
              alt=""
              class="image-uploader__preview"
            />
          </div>
        </span>
      </div>
      <div class="profile-info">
        <div class="form-control">
          <label for="fName">First name</label>
          <input type="text" id="fName" v-model.trim="fName" />
        </div>

        <div class="form-control">
          <label for="lName">Last name</label>
          <input type="text" id="lName" v-model.trim="lName" />
        </div>

        <button
          class="profile-info__button btn btn--primary"
          @click="updateHandler"
        >
          Update
        </button>
      </div>
    </div>
    <hr class="mt-sm" />
    <nav class="main-tab mt-sm" v-if="isUser">
      <ul class="main-tab-group">
        <li
          id="my-card"
          class="main-tab-group__item"
          @click="
            () => {
              isAddresses = false;
              isCards = true;
            }
          "
        >
          <router-link to="#" :class="{ 'active-setting': isCards }">
            <svg class="my-card-icon">
              <use xlink:href="../../assets/img/sprite.svg#icon-credit-card" />
            </svg>
            My Card</router-link
          >
        </li>
        <li
          class="main-tab-group__item"
          @click="
            () => {
              isCards = false;
              isAddresses = true;
            }
          "
        >
          <router-link to="#" :class="{ 'active-setting': isAddresses }">
            <svg class="my-card-icon">
              <use xlink:href="../../assets/img/sprite.svg#icon-map-pin" />
            </svg>
            Address</router-link
          >
        </li>
      </ul>
    </nav>

    <div class="credit-cards" v-show="isCards">
      <div
        class="credit-cards__item"
        v-for="(card, index) in userCreditCards"
        :key="card.id"
      >
        <div class="card-details">
          <p class="card-details__name">{{ card.creditCardName }}</p>
          <p class="card-details__last-digits">
            **** **** ***** {{ card.last4Digits }}
          </p>
          <p class="card-details__card-holder">
            {{ card.cardHolderNameAnonymized }}
          </p>
        </div>
        <div class="actions">
          <!-- <span @click="updatePopupHandler(index, 'card')">
            <svg class="edit-card-icon">
              <use xlink:href="../../assets/img/sprite.svg#icon-pencil" />
            </svg>
          </span> -->

          <span @click="deletionPopupHandler(card.id, 'card')">
            <svg class="delete-card-icon">
              <use xlink:href="../../assets/img/sprite.svg#icon-bin" />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <div class="user-addresses" v-show="isAddresses">
      <div
        class="user-addresses__item"
        v-for="(address, index) in userAddresses"
        :key="address.id"
      >
        <div class="address-details">
          <p class="address-details__name">{{ address.addressName }}</p>
          <p class="address-details__address">
            {{ address.address }}
          </p>
          <p class="address-details__zip">
            {{ address.zip }}
          </p>
        </div>
        <div class="actions">
          <span @click="updatePopupHandler(index, 'address')">
            <svg class="edit-card-icon">
              <use xlink:href="../../assets/img/sprite.svg#icon-pencil" />
            </svg>
          </span>

          <span @click="deletionPopupHandler(address.id, 'address')">
            <svg class="delete-card-icon">
              <use xlink:href="../../assets/img/sprite.svg#icon-bin" />
            </svg>
          </span>
        </div>
      </div>
    </div>
    <button class="action-delete btn btn--primary" @click="deleteAccHandler">
      Delete Acount
    </button>
  </div>
</template>

<script>
import { isProxy, toRaw } from "vue";
import { Cloudinary } from "cloudinary-core"; // If your code is for ES6 or higher

import CADeletionPopup from "../feedback/CADeletionPopup.vue";
import CAUpdatePopup from "../feedback/CAUpdatePopup.vue";
import AccountDeletionPopup from "../feedback/AccountDeletionPopup.vue";

var cl = new Cloudinary({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  secure: true,
});

export default {
  provide() {
    return {
      closeErrMsg: this.closeErrMsg,
      closeAlertMsg: this.closeAlertMsg,
      deleteCAHandler: this.deleteCAHandler,
      closeCADeletionPopup: this.closeCADeletionPopup,
      closeCAUpdatePopup: this.closeCAUpdatePopup,
      closeAccountDeletionPopup: this.closeAccountDeletionPopup,
    };
  },
  mounted() {
    this.loadProfileImg();
    this.loadFullname();
    if (this.$store.getters["auth/isInfluencer"] === "false") {
      this.fetchUserCards();
      this.fetchUserAddresses();
      this.isCards = true;
    }
  },
  computed: {
    isUser() {
      if (this.$store.getters["auth/isInfluencer"] === "false") return true;
    },
  },
  data() {
    return {
      profileImg: null,
      alertMsg: "Process done!",
      showAlertMsg: false,
      errMsg: "Something went wrong!",
      showErrMsg: false,
      fName: "",
      lName: "",
      userCreditCards: [],
      userAddresses: [],
      isCards: false,
      isAddresses: false,
      bringCADeletionCard: false,
      bringCAUpdateCard: false,
      cardId: null,
      addressId: null,
      address: null,
      card: null,
      caType: "",
      bringAccDeletionPopup: false,
    };
  },
  methods: {
    deleteAccHandler() {
      this.bringAccDeletionPopup = true;
    },
    async closeAccountDeletionPopup(response) {
      if (response === false) {
        this.errMsg = "Account could not be deleted!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
      this.bringAccDeletionPopup = false;
    },
    logoutHandler() {
      this.$store.dispatch("auth/logout");
    },
    async deleteCAHandler(id, type) {
      // send delete request
      let url;
      if (type === "card") {
        url = `http://localhost:8080/api/v1/settings/credit-card/${id}`;
      } else if (type === "address") {
        url = `http://localhost:8080/api/v1/settings/address/${id}`;
      }
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.getters["auth/token"],
        },
      });

      if (!response.ok) {
        // comment not deleted; error handler
        return;
      } else {
        const data = await response.json();
        if (type === "card") {
          this.userCreditCards = this.userCreditCards.filter(
            (card) => card.id !== id
          );
        } else if (type === "address") {
          this.userAddresses = this.userAddresses.filter(
            (address) => address.id !== id
          );
        }
      }
      this.closeCADeletionPopup();
    },
    closeCADeletionPopup() {
      this.bringCADeletionCard = false;
    },
    closeCAUpdatePopup(type) {
      this.bringCAUpdateCard = false;
      if (type === "address") {
        this.fetchUserAddresses();
        this.isAddresses = true;
        this.isCards = false;
      }
    },
    deletionPopupHandler(id, type) {
      if (type === "card") {
        this.cardId = id;
        this.caType = "card";
      } else {
        this.addressId = id;
        this.caType = "address";
      }
      this.bringCADeletionCard = true;
    },
    updatePopupHandler(index, type) {
      if (type === "card") {
        this.cardId = index;
        this.caType = "card";
        this.card = this.userCreditCards[this.cardId];
      } else {
        this.addressId = index;
        this.caType = "address";
        this.address = this.userAddresses[this.addressId];
      }
      this.bringCAUpdateCard = true;
    },

    async fetchUserAddresses() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/settings/address`,
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
          this.userAddresses = data.addresses;
        }
      } catch (error) {
        this.errMsg = "Address could not be fetched!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
    },
    async fetchUserCards() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/settings/credit-card`,
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
          this.userCreditCards = data.creditCards;
        }
      } catch (error) {
        this.errMsg = "Credit cards could not be fetched!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
    },
    closeErrMsg() {
      this.showErrMsg = false;
    },
    closeAlertMsg() {
      this.showAlertMsg = false;
    },
    async updateHandler() {
      let url;
      const payload = {
        realName: this.fName + " " + this.lName,
      };
      try {
        if (this.$store.getters["auth/isInfluencer"] === "true") {
          url = "http://localhost:8080/api/v1/settings/influencer/real-name";
        } else if (this.$store.getters["auth/isInfluencer"] === "false") {
          url = "http://localhost:8080/api/v1/settings/user/real-name";
        }
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.getters["auth/token"],
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw Error("Failed to change image!");
        } else {
          this.alertMsg = "Changes saved.";
          this.showAlertMsg = true;
          setTimeout(() => {
            this.showAlertMsg = false;
          }, 4000);
        }
      } catch (error) {
        this.errMsg = "Changes could not be saved!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
    },
    async preview(event, msg) {
      let file;
      let reader;
      let url;
      const frame1 = this.$refs.frame1;
      const fileLabel1 = this.$refs.fileLabel1;
      // frame1.src = URL.createObjectURL(event.target.files[0]);
      frame1.style.display = "inline-block";
      fileLabel1.style.display = "none";
      file = event.target.files[0];
      reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        frame1.src = reader.result;
        try {
          if (this.$store.getters["auth/isInfluencer"] === "true") {
            url = "http://localhost:8080/api/v1/settings/influencer/image";
          } else if (this.$store.getters["auth/isInfluencer"] === "false") {
            url = "http://localhost:8080/api/v1/settings/user/image";
          }
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.$store.getters["auth/token"],
            },
            body: JSON.stringify({
              image: reader.result,
            }),
          });
          if (!response.ok) {
            throw Error("Failed to change image!");
          } else {
            this.alertMsg = "Image saved.";
            this.showAlertMsg = true;
            setTimeout(() => {
              this.showAlertMsg = false;
            }, 4000);
          }
        } catch (error) {
          this.errMsg = "Image could not be saved!";
          this.showErrMsg = true;
          setTimeout(() => {
            this.showErrMsg = false;
          }, 5000);
        }
      };
    },
    async loadProfileImg(event, msg) {
      let url;
      const frame1 = this.$refs.frame1;
      const fileLabel1 = this.$refs.fileLabel1;
      frame1.style.display = "inline-block";
      fileLabel1.style.display = "none";
      if (this.$store.getters["auth/isInfluencer"] === "true") {
        url = "http://localhost:8080/api/v1/settings/influencer/image";
      } else if (this.$store.getters["auth/isInfluencer"] === "false") {
        url = "http://localhost:8080/api/v1/settings/user/image";
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.getters["auth/token"],
        },
      });
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      frame1.src = cl.image(data.imageLocation).src;
    },
    async loadFullname(event, msg) {
      let url;
      if (this.$store.getters["auth/isInfluencer"] === "true") {
        url = "http://localhost:8080/api/v1/settings/influencer/real-name";
      } else if (this.$store.getters["auth/isInfluencer"] === "false") {
        url = "http://localhost:8080/api/v1/settings/user/real-name";
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.getters["auth/token"],
        },
      });
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      const name = data.realName.split(" ");
      this.fName = name[0];
      this.lName = name[1];
    },
  },
  components: { CADeletionPopup, CAUpdatePopup, AccountDeletionPopup },
};
</script>

<style scoped lang="scss">
@import "./AccountSettings.module.scss";
</style>
