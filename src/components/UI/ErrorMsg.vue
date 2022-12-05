<template>
  <div class="alert danger-alert">
    <h3>{{ msg }}</h3>
    <a class="close" @click="closeErrMsg">&times;</a>
  </div>
</template>

<script>
export default {
  props: ["msg"],
  inject: ["closeErrMsg"],
};
</script>

<style scoped lang="scss">
@import "./Message.module.scss";
</style>
