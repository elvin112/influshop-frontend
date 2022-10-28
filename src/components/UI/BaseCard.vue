<template>
  <teleport to="body">
    <div class="backdrop"></div>
    <div class="card">
      <slot></slot></div
  ></teleport>
</template>

<style scoped>
.backdrop {
  opacity: 0.7;
  background-color: black;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 100;
}

.card {
  width: 40vw;
  min-height: 70vh;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  background-color: white;
  z-index: 101;
  border-radius: var(--card-border-radius);
  box-shadow: var(--shadow-light);
}
</style>
