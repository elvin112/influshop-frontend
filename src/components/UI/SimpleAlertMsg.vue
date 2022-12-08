<template>
  <div class="alert simple-alert">
    <h3>{{ msg }}</h3>
    <a class="close" @click="closeAlertMsg">&times;</a>
  </div>
</template>

<script>
export default {
  props: ["msg"],
  inject: ["closeAlertMsg"],
};
</script>

<style scoped lang="scss">
@import "./Message.module.scss";
</style>
