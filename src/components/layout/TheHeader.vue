<template>
  <div class="header-wrapper">
    <div class="header-1">
      <div class="download-app">
        <svg class="download-app__icon">
          <use xlink:href="../../assets/img/sprite.svg#icon-mobile" />
        </svg>
        <span>Download Influshop App Here</span>
      </div>
      <div class="menu">
        <nav class="menu-nav">
          <ul>
            <li class="menu-nav__item--1">
              <router-link to="/">Home</router-link>
            </li>
            <li class="menu-nav__item--2">
              <router-link to="/">Contact Us</router-link>
            </li>
            <li class="menu-nav__item--3">
              <router-link to="/">About Us</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="header-2"><BaseLogo /></div>
  </div>
</template>

<style scoped lang="scss">
@import "TheHeader.module.scss";
</style>
