<template>
  <header>
    <TheHeader />
  </header>
  <div class="wrapper">
    <main>
      <router-view></router-view>
    </main>
    <aside>
      <nav class="aside-nav">
        <ul class="aside-nav__group">
          <li class="aside-nav__group-item">
            <router-link to="/userSettings/settings">
              <svg class="aside-nav__group-item-icon--1">
                <use xlink:href="../assets/img/sprite.svg#icon-cog" />
              </svg>
              Settings</router-link
            >
          </li>
        </ul>
      </nav>
    </aside>
  </div>
  <footer>
    <TheFooter />
  </footer>
</template>

<style scoped lang="scss">
@import "UserSettings.module.scss";
</style>
