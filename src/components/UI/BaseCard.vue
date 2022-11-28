<template>
  <teleport to="body">
    <div class="backdrop"></div>
    <div class="card" v-bind="$attrs">
      <header>
        <slot name="header"></slot>
      </header>

      <slot></slot>
      <slot name="buttons"></slot>
    </div>
  </teleport>
</template>

<style scoped>
.backdrop {
  opacity: 0.7;
  background-color: black;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 100;
}

.card {
  width: 50vw;
  min-height: 70vh;
  max-height: 610px;
  overflow-y: scroll;
  scrollbar-width: thin;

  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  background-color: white;
  z-index: 101;
  border-radius: var(--card-border-radius);
  box-shadow: var(--shadow-light);
}

.min-content {
  width: 35vw;
  min-height: 10vh;
  max-height: 610px;
  top: 15%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

::-webkit-scrollbar {
  height: 10px;
  width: 7px;
  background: rgb(255, 255, 255);
}

::-webkit-scrollbar-thumb {
  background: #a3a3a1;
  -webkit-border-radius: 1ex;
  -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
}

::-webkit-scrollbar-corner {
  background: #000;
}
</style>
