<template>
  <main class="main">
    <header>
      <h2 class="header__banner">Signup</h2>
    </header>
    <div class="content">
      <ui-card class="card">
        <h1 class="logo">Influshop</h1>
        <h3 class="lets-kick-now">
          Let's Kick Now !
          <span>It's Easy and takes less than 20 seconds.</span>
        </h3>

        <ui-card class="form-card">
          <h4 class="form-card__title">Sign up</h4>
          <form class="form-card__content" @submit.prevent="submitForm">
            <div
              class="input-control"
              :class="{ 'input-control--danger': !isUsernameValid }"
            >
              <input
                id="username"
                type="text"
                class="auth-input"
                :class="{ 'auth-input--danger': !isUsernameValid }"
                placeholder="Username"
                v-model="username"
              />
              <svg
                class="input-icon"
                :class="{ 'input-icon--danger': !isUsernameValid }"
              >
                <use xlink:href="../../assets/img/sprite.svg#icon-user" />
              </svg>
            </div>
            <span v-show="!isUsernameValid" class="text-danger">{{
              usernameErrorMessage
            }}</span>

            <div
              class="input-control"
              :class="{ 'input-control--danger': !isEmailValid }"
            >
              <input
                id="email"
                type="email"
                class="auth-input"
                :class="{ 'auth-input--danger': !isEmailValid }"
                placeholder="Email"
                v-model="email"
              />
              <svg
                class="input-icon"
                :class="{ 'input-icon--danger': !isEmailValid }"
              >
                <use xlink:href="../../assets/img/sprite.svg#icon-mail" />
              </svg>
            </div>
            <span v-show="!isEmailValid" class="text-danger">{{
              emailErrorMessage
            }}</span>

            <div
              class="input-control"
              :class="{ 'input-control--danger': !isPasswordValid }"
            >
              <input
                id="password"
                type="password"
                class="auth-input"
                :class="{ 'auth-input--danger': !isPasswordValid }"
                placeholder="Password"
                v-model="password"
              />
              <svg
                class="input-icon"
                :class="{ 'input-icon--danger': !isPasswordValid }"
              >
                <use xlink:href="../../assets/img/sprite.svg#icon-key" />
              </svg>
            </div>
            <span
              v-show="!isPasswordValid"
              class="text-danger text-danger-margin-bottom"
              >Please use between 8 and 20 characters.</span
            >

            <div class="whoami">
              <p>I am ...</p>
              <div class="whoami__control">
                <div class="whoami__input-label">
                  <label for="user">User</label>
                  <input
                    type="radio"
                    name="user-type"
                    id="user"
                    v-model="pickedUserType"
                    value="user"
                    required
                  />
                </div>

                <div class="whoami__input-label">
                  <label for="influencer">Influencer</label>
                  <input
                    type="radio"
                    name="user-type"
                    id="influencer"
                    v-model="pickedUserType"
                    value="influencer"
                    required
                  />
                </div>
              </div>
            </div>

            <div class="button-control">
              <span
                v-show="isInternalError"
                class="text-danger text-danger--server"
                >*Failed to authenticate - Check your data.</span
              >
              <button type="submit" class="btn btn--primary btn--form">
                Get Started
              </button>
              <p class="have-account">
                Have an account?
                <router-link to="/signin"><span>Sign In</span></router-link>
              </p>
            </div>
          </form>
        </ui-card>

        <div class="return-home">
          <svg class="return-home__icon">
            <use xlink:href="../../assets/img/sprite.svg#icon-arrow_back_ios" />
          </svg>
          <span>Home</span>
        </div>

        <div class="copyright">
          <p>© Copyright 2022.</p>
        </div>
      </ui-card>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      isUsernameValid: true,
      isEmailValid: true,
      isPasswordValid: true,
      isFormValid: true,
      usernameErrorMessage: "",
      emailErrorMessage: "",
      isInternalError: false,
      pickedUserType: null,
    };
  },
  methods: {
    async submitForm() {
      this.isUsernameValid = true;
      this.isEmailValid = true;
      this.isPasswordValid = true;
      this.isFormValid = true;
      this.isInternalError = false;

      this.validateUsername(this.username);
      this.validateEmail(this.email);
      this.validatePassword(this.password);

      const response = await fetch(
        `http://localhost:8080/api/v1/auth/${this.pickedUserType}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
          }),
        }
      );
      this.pickedUserType = null;

      const data = await response.json();

      console.log(data.status);
      console.log(data.message);

      if (response.ok) {
        alert(data.message);
      } else if (!response.ok && data) {
        if (data.message.includes("Username already exists")) {
          this.usernameErrorMessage = data.message;
          this.isUsernameValid = false;
        } else if (data.message === "Email already exists") {
          this.emailErrorMessage = data.message;
          this.isEmailValid = false;
        } else {
          this.isInternalError = true;
        }
      }
    },
    validateUsername(newValue) {
      this.isUsernameValid = true;
      if (typeof newValue != "undefined") {
        if (newValue.length < 1 || newValue.length > 16) {
          this.isUsernameValid = false;
          this.isFormValid = false;
          this.usernameErrorMessage = "Please use between 1 and 16 characters.";
        }
      }
    },
    validateEmail(newValue) {
      this.isEmailValid = true;
      if (typeof newValue != "undefined") {
        if (
          !newValue.includes("@") ||
          newValue.length < 4 ||
          newValue.length > 35
        ) {
          this.isEmailValid = false;
          this.isFormValid = false;
          this.emailErrorMessage = "Please enter a valid email address.";
        }
      }
    },
    validatePassword(newValue) {
      this.isPasswordValid = true;
      if (typeof newValue != "undefined") {
        if (newValue.length < 8 || newValue.length > 20) {
          this.isPasswordValid = false;
          this.isFormValid = false;
        }
      }
    },
  },
  watch: {
    username(value) {
      this.validateUsername(value);
    },
    email(value) {
      this.validateEmail(value);
    },
    password(value) {
      this.validatePassword(value);
    },
  },
};
</script>

<script setup></script>

<style scoped lang="scss">
@import "Signup.module.scss";
</style>
