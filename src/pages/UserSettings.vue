<template>
  <header>
    <TheHeader />
  </header>
  <div class="wrapper">
    <main>
      <nav class="main-tab">
        <ul class="main-tab-group">
          <li class="main-tab-group__item">
            <router-link to="/">Account Setting</router-link>
          </li>
          <li class="main-tab-group__item">
            <router-link to="/">Login & Security</router-link>
          </li>
          <li class="main-tab-group__item">
            <router-link to="/userSettings/settings/store"
              >My Store</router-link
            >
          </li>
        </ul>
      </nav>
      <router-view></router-view>
    </main>
    <aside>
      <nav class="aside-nav">
        <ul class="aside-nav__group">
          <li class="aside-nav__group-item">
            <svg class="return-home__icon">
              <use xlink:href="../assets/img/sprite.svg#icon-cog" />
            </svg>
            <router-link to="/">Settings</router-link>
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
