<template>
  <Transition>
    <ErrorMsg v-if="showErrMsg" :msg="errMsg" />
  </Transition>
  <Transition>
    <SimpleAlertMsg v-if="showAlertMsg" :msg="alertMsg" />
  </Transition>
  <h2 v-if="isLoading">Loading...</h2>
  <div class="wrapper">
    <ItemDeletionSimplePopup v-if="bringSimpleItemDeletionCard" />
    <ItemGroupDeletionPopup
      v-if="bringItemGroupDeletionCard"
      :extraFeatures="extraFeatures"
    />
    <UpdateSimpleItem
      v-if="bringFlatItemUpdateCard"
      :itemToUpdate="itemToUpdate"
    />
    <UpdateItemWFeature
      v-if="bringItemWFeatureUpdateCard"
      :itemToUpdate="itemToUpdate"
      :extraFeatures="extraFeatures"
    />
    <div class="introductory">
      <h3 class="introductory__header-title">TYPE</h3>
      <h3 class="introductory__header-title">NAME</h3>
      <h3 class="introductory__header-title">PRICE</h3>
      <h3 class="introductory__header-title">AVAILABILITY</h3>
      <h3 class="introductory__header-title">ACTIONS</h3>
    </div>
    <hr />
    <div class="items">
      <ul>
        <li v-for="item in influencerItems" :key="item.id">
          <p>{{ item.type === "item" ? "item" : "item group" }}</p>
          <p>{{ item.name }}</p>
          <p>${{ item.price }}</p>
          <p class="item__availability">
            {{ item.available ? "in stock" : "out of stock" }}
          </p>
          <div class="actions">
            <div class="edit-item" @click="updatePopupHandler(item)">
              <svg class="edit-item__icon">
                <use xlink:href="../../assets/img/sprite.svg#icon-pencil" />
              </svg>
            </div>
            <span class="seperator"></span>
            <div
              class="delete-item"
              @click="deletePopupHandler(item.id, item.type, item.name)"
            >
              <svg class="delete-item__icon">
                <use xlink:href="../../assets/img/sprite.svg#icon-bin" />
              </svg>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ItemDeletionSimplePopup from "./ItemDeletionSimplePopup.vue";
import ItemGroupDeletionPopup from "./ItemGroupDeletionPopup.vue";
import UpdateItemWFeature from "./UpdateItemWFeature.vue";
import UpdateSimpleItem from "./UpdateSimpleItem.vue";

export default {
  provide() {
    return {
      deleteItem: this.deleteSimpleItem,
      deleteItemGroup: this.deleteItemGroup,
      closeSimpleDeletionPopup: this.closeSimpleDeletionPopup,
      closeItemGroupDeletionPopup: this.closeItemGroupDeletionPopup,
      closeUpdateFlatItemPopup: this.closeUpdateFlatItemPopup,
      closeUpdateItemWFeaturePopup: this.closeUpdateItemWFeaturePopup,
    };
  },
  components: {
    ItemDeletionSimplePopup,
    ItemGroupDeletionPopup,
    UpdateSimpleItem,
    UpdateItemWFeature,
  },
  data() {
    return {
      alertMsg: "Process done!",
      showAlertMsg: false,
      errMsg: "Something went wrong!",
      showErrMsg: false,
      isLoading: false,
      itemId: null,
      itemType: null,
      itemName: null,
      bringSimpleItemDeletionCard: false,
      bringItemGroupDeletionCard: false,
      bringFlatItemUpdateCard: false,
      bringItemWFeatureUpdateCard: false,
      extraFeatures: [],
      itemToUpdate: null,
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

    async updatePopupHandler(item) {
      this.itemToUpdate = item;
      this.itemId = item.id;
      this.itemType = item.type;
      this.itemName = item.name;
      if (item.type === "item") {
        this.bringFlatItemUpdateCard = true;
      } else if (item.type === "itemGroup") {
        const response = await fetch(
          `http://localhost:8080/api/v1/item-ops/item-group/${this.itemId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw Error("Internal server error");
        } else {
          const data = await response.json();
          this.extraFeatures = data.itemGroup.extraFeatures;
        }

        this.bringItemWFeatureUpdateCard = true;
      }
    },

    async deletePopupHandler(itemId, itemType, itemName) {
      this.itemId = itemId;
      this.itemType = itemType;
      this.itemName = itemName;
      if (itemType === "item") {
        this.bringSimpleItemDeletionCard = true;
      } else {
        const response = await fetch(
          `http://localhost:8080/api/v1/item-ops/item-group/${this.itemId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw Error("Internal server error");
        } else {
          const data = await response.json();
          this.extraFeatures = data.itemGroup.extraFeatures;
        }
        this.bringItemGroupDeletionCard = true;
      }
    },
    async deleteSimpleItem() {
      try {
        await this.$store.dispatch("influencer/deleteItem", {
          itemId: this.itemId,
          itemType: this.itemType,
        });
      } catch (error) {
        this.errMsg = "Item could not be deleted!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }

      this.alertMsg = "Item successfully deleted.";
      this.showAlertMsg = true;
      setTimeout(() => {
        this.showAlertMsg = false;
      }, 4000);

      this.bringSimpleItemDeletionCard = false;
    },
    async deleteItemGroup(queryParams) {
      this.bringItemGroupDeletionCard = false;

      try {
        await this.$store.dispatch("influencer/deleteItem", {
          queryParams: queryParams,
          itemName: this.itemName,
          itemType: this.itemType,
        });
        this.alertMsg = "Item successfully deleted.";
        this.showAlertMsg = true;
        setTimeout(() => {
          this.showAlertMsg = false;
        }, 4000);
      } catch (error) {
        this.errMsg = "Item could not be deleted!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
    },
    closeSimpleDeletionPopup() {
      this.bringSimpleItemDeletionCard = false;
    },
    closeItemGroupDeletionPopup() {
      this.bringItemGroupDeletionCard = false;
    },
    closeUpdateFlatItemPopup(result) {
      if (result === "cancel") {
        this.bringFlatItemUpdateCard = false;
        return;
      }
      if (result) {
        this.alertMsg = "Item updated.";
        this.showAlertMsg = true;
        setTimeout(() => {
          this.showAlertMsg = false;
        }, 4000);
      } else if (result === false) {
        this.errMsg = "Item could not be updated!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
      this.bringFlatItemUpdateCard = false;
      this.fetchItems();
    },
    closeUpdateItemWFeaturePopup(result) {
      if (result === "cancel") {
        this.bringItemWFeatureUpdateCard = false;
        return;
      }
      if (result) {
        this.alertMsg = "Item updated.";
        this.showAlertMsg = true;
        setTimeout(() => {
          this.showAlertMsg = false;
        }, 4000);
      } else if (result === false) {
        this.errMsg = "Item could not be updated!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
      this.bringItemWFeatureUpdateCard = false;
      this.fetchItems();
    },
  },
};
</script>

<style scoped lang="scss">
@import "./InfluencerItems.module.scss";
</style>
