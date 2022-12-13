<template>
  <BaseCard class="min-content">
    <template #header>
      <h2 class="header__title">Are you sure to delete this {{ caType }}?</h2>
      <br />
      <p class="header__par">{{ caType }} will be deleted permanently.</p>
    </template>
    <template #buttons>
      <div class="form-button-control">
        <button class="btn btn--cancel" type="submit" @click="deleteHandler">
          Delete
        </button>
        <button class="btn btn--success" @click="closeCADeletionPopup()">
          Cancel
        </button>
      </div>
    </template>
  </BaseCard>
</template>

<script>
export default {
  props: ["cardId", "addressId", "caType"],
  inject: ["closeCADeletionPopup", "deleteCAHandler"],
  methods: {
    deleteHandler() {
      if (this.caType === "card") {
        this.deleteCAHandler(this.cardId, this.caType);
      } else if (this.caType === "address") {
        this.deleteCAHandler(this.addressId, this.caType);
      }
    },
  },
};
</script>

<style>
.header__title {
  font-family: "Montserrat", sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
}

.header__par {
  font-family: "Montserrat", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  display: inline-block;
}

.header__par:first-letter {
  text-transform: uppercase;
}

.form-button-control {
  width: 100%;
  display: flex;
  margin-top: 100px;
}
.btn {
  padding: 0.53rem 1.47rem;
  width: 100%;
}
.btn:not(last-child) {
  margin-right: 1rem;
}
</style>
