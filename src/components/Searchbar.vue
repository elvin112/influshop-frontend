<template>
  <div class="searchbar-wrapper">
    <div class="drop-down" v-show="true">
      <nav>
        <ul>
          <router-link to="/userSettings/settings/account">
            <li>
              <p>Settings</p>
            </li>
          </router-link>

          <li
            @click="
              {
              }
            "
          >
            <p>Logout</p>
          </li>
        </ul>
      </nav>
    </div>
    <div class="input-control">
      <span class="search-icon">
        <svg class="search-icon__icon">
          <use xlink:href="../assets/img/sprite.svg#icon-search" />
        </svg>
      </span>
      <input
        @click="expandMenuHandler()"
        type="text"
        placeholder="Search for anything"
        class="search-input"
      />
      <select name="" id="" class="search-by" v-model="selectedSearchCat">
        <option value="influencer">Influencer</option>
        <option value="item">Item</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedSearchCat: "influencer",
      isDropDownOpen: false,
    };
  },
  mounted() {
    this.isDropDownOpen = this.isMenuOpen;
  },
  methods: {
    expandMenuHandler() {
      this.isDropDownOpen = true;
    },
    discardSearchWindow() {
      this.isDropDownOpen = false;
    },
  },
};
</script>

<style scoped lang="scss">
.searchbar-wrapper {
  background-color: var(--color-primary--3);
  height: 4.7rem;
  position: relative;

  .input-control {
    width: 33.5rem;
    height: 3.1rem;
    background-color: white;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(112%);
    display: grid;
    grid-template-columns: 6% 65% 25%;
    align-items: center;
    text-align: center;
    border-radius: 4px;
    .search-icon {
      display: inline-block;
      &__icon {
        width: 1.4rem;
        height: 1.4rem;
      }
    }
    .search-input {
      height: 100%;
      border: none;
      font-family: "Montserrat", sans-serif;
      font-size: 0.95rem;
      font-weight: 500;
      caret-color: var(--color-primary);
      padding-left: 0.4rem;
      &:focus {
        outline: none;
      }
    }
  }
  .input-control::after {
    content: "";
    position: absolute;
    left: 70%;
    height: 35px;
    width: 0.1rem;
    background-color: var(--color-grey-light-6);
  }

  .search-by {
    border: none;
    font-family: "Montserrat", sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: var(--color-grey-light-4);

    &:focus {
      outline: none;
      color: black;
    }
  }

  .drop-down {
    background-color: white;
    width: 33.5rem;
    height: min-content;
    border: 1px solid white;
    z-index: 99;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(112%);

    ul {
      list-style: none;
    }

    a {
      text-decoration: none;
    }

    li {
      border-bottom: 1px solid var(--color-grey-light-6);
      padding: 0.7rem;
    }
    li:not(:last-child) {
      border-bottom: none;
    }

    p {
      margin-left: 2rem;
      font-size: 1rem;
      font-family: "Montserrat", sans-serif;
      font-size: 0.85rem;
    }
  }
}
</style>
