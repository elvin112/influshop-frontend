<template>
  <div class="wrapper">
    <header>
      <div class="header-1"></div>
      <div class="header-2"></div>
      <div class="header-3"></div>
    </header>
    <main>Main</main>
    <aside>Aside</aside>
    <footer>Footer</footer>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(1, 1fr);
}

header {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  background-color: orangered;
  grid-row: 1 / 2;
}

main {
  background-color: green;
  grid-row: 2 / 3;
  grid-column: 2 / -1;
}

aside {
  background-color: yellow;
  grid-row: 2 / 3;
  grid-column: 1 / 2;
}
footer {
  background-color: gray;
  grid-row: 3 / -1;
  grid-column: 1 / -1;
}

.header-1 {
  background-color: var(--color-grey-light-1);
}
</style>
