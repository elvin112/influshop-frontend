<template>
  <div class="wrapper">
    <header>
      <TheHeader />
    </header>
    <main>
      <h3>Main Content</h3>
    </main>
    <aside>Sidebar</aside>
    <footer>
      <TheFooter />
    </footer>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-rows: repeat(4, min-content);
  grid-template-columns: 24% 1fr;
}

header {
  display: grid;
  grid-row: 1 / 2;
  grid-column: 1 / -1;
  height: auto;
}

main {
  background-color: rgb(109, 128, 0);
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
</style>
