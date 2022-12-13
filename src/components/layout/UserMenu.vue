<template>
  <div class="wrapper">
    <div class="avatar">
      <!-- Avatar image -->
      <img
        ref="frameAvatar"
        class="avatar__image"
        src="../../assets/img/no-img-placeholder.jpeg"
      />
    </div>
    <p
      class="username"
      @click="
        {
          toggleMenu();
        }
      "
    >
      {{ fName }}
    </p>
    <div
      class="dd-menu-item"
      @click="
        {
          toggleMenu();
        }
      "
    >
      <svg class="dd-menu-item__icon">
        <use xlink:href="../../assets/img/sprite.svg#icon-chevron-down" />
      </svg>
      <div class="drop-down" v-show="isMenuOpen">
        <nav>
          <ul>
            <router-link to="/userSettings/settings/account">
              <li>
                <p>Settings</p>
              </li>
            </router-link>

            <li @click="logoutHandler()">
              <p>Logout</p>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { Cloudinary } from "cloudinary-core"; // If your code is for ES6 or higher

var cl = new Cloudinary({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  secure: true,
});

export default {
  data() {
    return {
      isMenuOpen: false,
      fullName: "",
      fName: "",
      lName: "",
    };
  },
  mounted() {
    this.loadProfile();
  },

  methods: {
    async loadProfile() {
      this.loadProfileImg();
      this.loadUsername();
    },
    async loadUsername() {
      let url;
      if (this.$store.getters["auth/isInfluencer"] === "true") {
        url = "http://localhost:8080/api/v1/settings/influencer/real-name";
      } else if (this.$store.getters["auth/isInfluencer"] === "false") {
        url = "http://localhost:8080/api/v1/settings/user/real-name";
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.getters["auth/token"],
        },
      });
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      const name = data.realName.split(" ");
      this.fName = name[0];
      this.lName = name[1];
      this.fullName = this.fName + " " + this.lName;
    },
    async loadProfileImg() {
      let url;
      const frameAvatar = this.$refs.frameAvatar;
      if (this.$store.getters["auth/isInfluencer"] === "true") {
        url = "http://localhost:8080/api/v1/settings/influencer/image";
      } else if (this.$store.getters["auth/isInfluencer"] === "false") {
        url = "http://localhost:8080/api/v1/settings/user/image";
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.getters["auth/token"],
        },
      });
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      console.log(frameAvatar);
      frameAvatar.src = cl.image(data.imageLocation).src;
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    logoutHandler() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  align-items: center;

  .drop-down {
    background-color: var(--color-primary);
    width: 7rem;
    height: min-content;
    position: absolute;
    top: 50%;
    transform: translateY(2%);
    border: 1px solid white;

    ul {
      list-style: none;
    }

    a {
      text-decoration: none;
    }

    li {
      border-bottom: 1px solid white;
      padding: 0.7rem;
    }
    li:not(:last-child) {
      border-bottom: none;
    }

    p {
      font-size: 1rem;
      font-family: "Montserrat", sans-serif;
      font-size: 0.85rem;
      color: white;
    }
  }
  .username {
    font-size: 1rem;
    font-family: "Montserrat", sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
  }
  .avatar {
    /* Rounded border */
    border-radius: 50%;
    border: 1px solid rgb(115, 110, 110);
    /* Center the content */
    align-items: center;
    display: flex;
    justify-content: center;
    margin-right: 0.2rem;

    /* Size */
    height: 3.3rem;
    width: 3.3rem;
    overflow: hidden;
  }

  .avatar__image {
    /* Size */
    width: 100%;
    background-size: cover;
  }

  .dd-menu-item {
    position: relative;

    display: inline-block;
    margin-top: auto;
    width: min-content;
    height: min-content;
    cursor: pointer;
    transform: translateY(2%);
    &__icon {
      width: 1rem;
    }
  }
}
</style>
