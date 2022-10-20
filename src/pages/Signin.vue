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
          <form class="form-card__content">
            <div class="input-control">
              <input
                type="text"
                class="auth-input"
                placeholder="Username"
                name=""
                id=""
              />
              <svg class="input-icon">
                <use xlink:href="../assets/img/sprite.svg#icon-user" />
              </svg>
            </div>

            <div class="input-control">
              <input
                type="password"
                class="auth-input"
                placeholder="Password"
                name=""
                id=""
              />
              <svg class="input-icon">
                <use xlink:href="../assets/img/sprite.svg#icon-key" />
              </svg>
            </div>
            <button type="submit" class="btn btn--primary btn--form">
              Get Started
            </button>
            <p class="have-account">Have an account? <span>Sign In</span></p>
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

<script></script>

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
  font-size: 19.7rem;
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
  width: 20vw;
  height: 53vh;
  position: absolute;
  left: 50%;
  top: 20%;
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
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  width: 80%;
}
.input-control {
  margin-bottom: 1.7rem;
  width: 100%;
  position: relative;
  border-bottom: 1px solid var(--color-grey-light-3);
}

.auth-input,
.auth-input:focus {
  caret-color: var(--color-primary);
  padding: 0.8rem 0;
  outline: none !important;
  border: 0;
  width: 85%;
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

.btn--form {
  width: 100%;
  padding: 0.7rem;
  margin-top: 1rem;
}

.have-account {
  font-size: 0.8rem;
  display: inline-block;
  margin: 0 auto;
  margin-top: 0.2rem;
}

.have-account span {
  color: var(--color-primary);
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
</style>
