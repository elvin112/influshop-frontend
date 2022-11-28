<template>
  <BaseCard class="min-content">
    <template #header>
      <h2 class="header__title">Are you sure to delete this comment?</h2>
      <br />
      <p class="header__par">Comment will be deleted permanently.</p>
    </template>
    <template #buttons>
      <div class="form-button-control">
        <button class="btn btn--cancel" type="submit" @click="deleteComment()">
          Delete
        </button>
        <button class="btn btn--success" @click="closeCommentDeletionPopup()">
          Cancel
        </button>
      </div>
    </template>
  </BaseCard>
</template>

<script>
export default {
  props: ["commentId"],
  inject: [
    "bringCommentDeletionCard",
    "deleteComment",
    "closeCommentDeletionPopup",
  ],
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
