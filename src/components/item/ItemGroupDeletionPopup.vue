<template>
  <BaseCard class="min-content">
    <template #header>
      <h2 class="header__title">Select item's features to delete</h2>
      <br />
      <div
        class="item-group-container"
        v-for="property in this.extraFeatureProperties"
      >
        <div class="item-group-container__prop">
          <p class="prop-par">{{ property }}</p>
        </div>

        <div class="item-group-container__content">
          <select name="" id="" class="form-input--primary" required>
            <option v-for="elem in this.extraFeatures[property]">
              {{ elem }}
            </option>
          </select>
        </div>
      </div>
    </template>
    <template #buttons>
      <div class="form-button-control-2">
        <button
          class="btn btn--cancel"
          type="submit"
          @click="deleteItemGroupHandler"
        >
          Delete
        </button>
        <button class="btn btn--success" @click="closeItemGroupDeletionPopup()">
          Cancel
        </button>
      </div>
    </template>
  </BaseCard>
</template>

<script>
export default {
  inject: ["deleteItemGroup", "closeItemGroupDeletionPopup"],
  props: ["extraFeatures"],
  data() {
    return {
      extraFeatureProperties: [],
    };
  },
  mounted() {
    for (const property in this.extraFeatures) {
      this.extraFeatureProperties.push(property);
    }
  },
  methods: {
    deleteItemGroupHandler() {
      const propertyNodes = document.getElementsByClassName("prop-par");
      const contentNodes = document.getElementsByClassName(
        "form-input--primary"
      );

      let queryParams = "";
      for (let index = 0; index < propertyNodes.length; index++) {
        if (index !== 0) {
          queryParams += "&";
        }
        const prop = propertyNodes[index].innerHTML;
        const cont = contentNodes[index].value;
        queryParams += `${prop}=${cont}`;
      }

      this.deleteItemGroup(queryParams);
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
}

.form-button-control-2 {
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

.item-group-container {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-gap: 1rem;
  margin-bottom: 1rem;
}

.form-input--primary {
  margin-left: 0.5rem;
  width: 80%;
}

p {
  font-family: "Montserrat", sans-serif;
}
</style>
