<template>
  <BaseCard class="min-content">
    <template #header>
      <h2 class="header__title">Are you sure to delete your account?</h2>
      <br />
      <p class="header__par">Account will be deleted permanently.</p>
    </template>
    <template #buttons>
      <div class="form-button-control">
        <button class="btn btn--cancel" type="submit" @click="deleteAccount()">
          Delete
        </button>
        <button class="btn btn--success" @click="closeAccountDeletionPopup()">
          Cancel
        </button>
      </div>
    </template>
  </BaseCard>
</template>

<script>
export default {
  inject: ["closeAccountDeletionPopup"],
  methods: {
    async deleteAccount() {
      let url;

      if (this.$store.getters["auth/isInfluencer"] === "true") {
        url = "http://localhost:8080/api/v1/settings/influencer";
      } else if (this.$store.getters["auth/isInfluencer"] === "false") {
        url = "http://localhost:8080/api/v1/settings/user";
      }
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.getters["auth/token"],
          },
        });

        if (!response.ok) {
          throw Error();
        } else {
          this.logoutHandler();
        }
      } catch (error) {
        this.closeAccountDeletionPopup(false);
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
