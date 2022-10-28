<template>
  <BaseCard>
    <div class="wrapper-add-item">
      <h2 class="title">Adding New Item</h2>

      <form action="" class="add-item-form">
        <div class="add-item-form__form-control">
          <label for="item-name">Name:</label>
          <input type="text" id="item-name" v-model="itemName" />
        </div>
        <div class="add-item-form__form-control">
          <label for="item-description">Description:</label>
          <textarea
            rows="5"
            cols="30"
            type="text"
            id="item-description"
            v-model="itemDescription"
          ></textarea>
        </div>

        <div class="add-item-form__form-control">
          <label for="item-price">Price:</label>
          <input type="text" id="item-price" v-model="itemPrice" />
        </div>

        <div class="add-item-form__form-control">
          <label for="item-quantity">Quantity:</label>
          <input type="number" id="item-quantity" v-model="itemQuantity" />
        </div>
        <div class="add-item-form__form-control">
          <p>Pin this item?</p>
          <label for="pin-item">Yes</label>
          <input
            type="radio"
            id="pin-item"
            name="pin-this-item"
            v-model="isPinned"
            value="yes"
          />

          <label for="dont-pin-item">No</label>
          <input
            type="radio"
            id="dont-pin-item"
            name="pin-this-item"
            v-model="isPinned"
            value="no"
          />
        </div>

        <div class="form-button-control">
          <button class="btn btn--success">Save</button>
          <button class="btn btn--cancel">Cancel</button>
        </div>
      </form>
    </div>
  </BaseCard>
</template>

<script>
export default {
  data() {
    isPinned: false;
  },
};
</script>

<style scoped lang="scss">
@import "./AddItem.module.scss";
</style>
