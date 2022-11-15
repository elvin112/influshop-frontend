<template>
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
import UpdateSimpleItem from "./UpdateSimpleItem.vue";

export default {
  provide() {
    return {
      deleteItem: this.deleteSimpleItem,
      deleteItemGroup: this.deleteItemGroup,
      closeSimpleDeletionPopup: this.closeSimpleDeletionPopup,
      closeItemGroupDeletionPopup: this.closeItemGroupDeletionPopup,
    };
  },
  components: {
    ItemDeletionSimplePopup,
    ItemGroupDeletionPopup,
    UpdateSimpleItem,
  },
  data() {
    return {
      isLoading: false,
      itemId: null,
      itemType: null,
      itemName: null,
      bringSimpleItemDeletionCard: false,
      bringItemGroupDeletionCard: false,
      bringFlatItemUpdateCard: false,
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
      this.bringFlatItemUpdateCard = true;
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
    deleteSimpleItem() {
      this.$store.dispatch("influencer/deleteItem", {
        itemId: this.itemId,
        itemType: this.itemType,
      });
      this.bringSimpleItemDeletionCard = false;
    },
    deleteItemGroup(queryParams) {
      this.bringItemGroupDeletionCard = false;

      this.$store.dispatch("influencer/deleteItem", {
        queryParams: queryParams,
        itemName: this.itemName,
        itemType: this.itemType,
      });
    },
    closeSimpleDeletionPopup() {
      this.bringSimpleItemDeletionCard = false;
    },
    closeItemGroupDeletionPopup() {
      this.bringItemGroupDeletionCard = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "./InfluencerItems.module.scss";
</style>
