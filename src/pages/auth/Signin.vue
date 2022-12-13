<template>
  <main class="main">
    <header>
      <h2 class="header__banner">Signin</h2>
    </header>
    <div class="content">
      <ui-card class="card">
        <h1 class="logo">Influshop</h1>
        <h3 class="lets-kick-now">
          Let's Kick Now !
          <span>It's Easy and takes less than 20 seconds.</span>
        </h3>

        <ui-card class="form-card">
          <h4 class="form-card__title">Sign in</h4>
          <form class="form-card__content" @submit.prevent="submitForm">
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
                >{{ internalErrorMessage }}</span
              >
              <button type="submit" class="btn btn--primary btn--form">
                Get Started
              </button>
              <p class="have-account">
                Don't have an account?
                <router-link to="/signup"><span>Join now!</span></router-link>
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
      email: "",
      password: "",
      isEmailValid: true,
      isPasswordValid: true,
      isFormValid: true,
      emailErrorMessage: "",
      isInternalError: false,
      internalErrorMessage: "",
      pickedUserType: null,
    };
  },
  methods: {
    async submitForm() {
      this.isEmailValid = true;
      this.isPasswordValid = true;

      this.isInternalError = false;

      this.internalErrorMessage =
        "*Something went wrong - Please try again later.";

      this.validateEmail(this.email);
      this.validatePassword(this.password);

      if (!this.isEmailValid || !this.isPasswordValid) {
        return;
      }

      const actionPayload = {
        username: this.username,
        email: this.email,
        password: this.password,
        pickedUserType: this.pickedUserType,
      };

      const response = await this.$store.dispatch("auth/signin", actionPayload);
      this.pickedUserType = null;

      const data = await response.json();
      if (response.ok) {
        this.$router.push("/");
      } else {
        if (data.status === 401) {
          if (data.message === "Invalid email or password") {
            this.internalErrorMessage = `* ${data.message}`;

            this.isInternalError = true;
          } else if (data.message.includes("with that email does not exist")) {
            this.internalErrorMessage = `* ${data.message}`;
            this.isEmailValid = false;
            this.isInternalError = true;
          }
        } else if (data.status === 500) {
          this.internalErrorMessage =
            "*Something went wrong - Please try again later.";
          this.isInternalError = true;
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

<style scoped lang="scss">
@import "Signin.module.scss";
</style>
