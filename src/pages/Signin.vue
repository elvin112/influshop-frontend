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
                <use xlink:href="../assets/img/sprite.svg#icon-mail" />
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
                <use xlink:href="../assets/img/sprite.svg#icon-key" />
              </svg>
            </div>
            <span
              v-show="!isPasswordValid"
              class="text-danger text-danger-margin-bottom"
              >Please use between 8 and 20 characters.</span
            >

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
                <router-link to="/signup"
                  ><span>Click here to join now!</span></router-link
                >
              </p>
            </div>
          </form>
        </ui-card>

        <div class="return-home">
          <svg class="return-home__icon">
            <use xlink:href="../assets/img/sprite.svg#icon-arrow_back_ios" />
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
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/user/login",
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

      const data = await response.json();
      console.log(data.status);
      console.log(data.message);
      if (data.status === 401) {
        if (data.message === "Invalid email or password") {
          this.internalErrorMessage = `* ${data.message}`;

          this.isInternalError = true;
        } else if (data.message === "A user with that email does not exist") {
          this.internalErrorMessage = `* ${data.message}`;
          this.isEmailValid = false;
          this.isInternalError = true;
        }
      } else if (data.status === 500) {
        this.internalErrorMessage =
          "*Something went wrong - Please try again later.";
        this.isInternalError = true;
      } else if (data.message === "User Successfully Logged In") {
        alert("User Successfully Logged In!");
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

<style scoped>
.main {
  background-image: linear-gradient(0deg, rgb(246, 246, 246, 0.9) 0% 100%),
    url("../assets/img/auth-page-background.jpg");
  background-size: cover;
  height: 100vh;
  position: relative;
}

.header__banner {
  font-size: 18.7rem;
  font-weight: 800;
  text-align: center;
  color: var(--color-grey-light-1);
  text-transform: uppercase;
  line-height: 0.9;
}

.content {
  position: absolute;
  left: 50%;
  top: 15%;
  transform: translateX(-50%);
}

.card {
  position: relative;
  width: 62vw;
  height: 78vh;
  border-radius: var(--card-border-radius-1);
  background-image: linear-gradient(
    to right,
    var(--color-primary) 0% 50%,
    #ffffff 50% 100%
  );
}

.logo {
  position: absolute;
  top: 1.4rem;
  left: 2rem; /* This is equal to 32px */
  font-family: "Montserrat, sans-serif";
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-grey-light-2);
}

.lets-kick-now {
  position: absolute;
  top: 50%;
  left: 2rem; /* This is equal to 32px */
  font-family: "Montserrat, sans-serif";
  font-size: 1.4rem;
  color: var(--color-grey-light-2);
  transform: translateY(-50%);
  line-height: 1.1;
}

.lets-kick-now span {
  display: block;
  font-size: 0.7rem;
  color: var(--color-primary--2);
}

.form-card {
  width: 22vw;
  height: auto;
  position: absolute;
  left: 50%;
  top: 19%;
  transform: translateX(-50%);
  border-radius: var(--card-border-radius-1);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-grey-dark-1) !important;
}

.form-card__title {
  color: inherit;
  text-transform: uppercase;
  font-family: "Montserrat, sans-serif";
  font-weight: 300;
  font-size: 1rem;
  padding-top: 1.4rem;
}

.form-card__title::before {
  content: "";
  position: absolute;
  top: 3.6rem;
  left: 50%;
  transform: translateX(-50%);
  height: 1px;
  width: 1.2rem;
  background-color: var(--color-primary);
}

.form-card__content {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  width: 80%;
}
.input-control {
  margin-bottom: 1.5rem;
  width: 100%;
  position: relative;
  border-bottom: 1px solid var(--color-grey-light-3);
}

.input-control--danger {
  border-bottom: 1px solid red;
}

.auth-input,
.auth-input:focus {
  caret-color: var(--color-primary);
  padding: 0.8rem 0;
  outline: none !important;
  border: 0;
  width: 85%;
}

.auth-input--danger::placeholder {
  color: red;
}

.input-icon {
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 0.7rem;
  right: 0.2rem;
  fill: transparent;
  stroke: var(--color-grey-dark-1);
}

.input-icon--danger {
  stroke: red;
}

.button-control {
  margin-top: 1.1rem;
  text-align: center;
}
.btn--form {
  width: 100%;
  padding: 0.7rem;
}

.have-account {
  font-size: 0.8rem;
  display: inline-block;
  margin: 0 auto;
  margin-top: 0.2rem;
  margin-bottom: 1.6rem;
}

.have-account span,
a {
  color: var(--color-primary);
  text-decoration: none;
}

.return-home {
  position: absolute;
  display: flex;
  bottom: 2%;
  left: 2rem; /* This is equal to 32px */
  font-family: "Montserrat, sans-serif";
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--color-grey-light-2);
  transform: translateY(-50%);
  line-height: 1;
  text-transform: uppercase;
  align-items: center;
}

.return-home__icon {
  fill: var(--color-grey-light-1);
  width: 1rem;
  height: 1rem;
  display: inline-block;
}

.copyright {
  position: absolute;
  display: flex;
  bottom: 2%;
  right: 2rem; /* This is equal to 32px */
  font-family: "Montserrat, sans-serif";
  font-size: 0.6rem;
  font-weight: 600;
  color: var(--color-grey-dark-1);
  transform: translateY(-50%);
  line-height: 1;
  align-items: center;
}

.text-danger {
  font-family: "Montserrat, sans-serif";
  font-size: 0.7rem;
  margin-bottom: 0.8rem;
  margin-top: -1.3rem;
  color: red;
}

.text-danger--server {
  margin-top: 0.5rem;
}
.text-danger-margin-bottom {
  margin-bottom: 0.8rem;
}
</style>
