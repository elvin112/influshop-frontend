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
          <form class="form-card__content">
            <input
              type="text"
              class="auth-input"
              placeholder="Username"
              name=""
              id=""
            />
            <input
              type="text"
              class="auth-input"
              placeholder="Email"
              name=""
              id=""
            />
            <input
              type="text"
              class="auth-input"
              placeholder="Password"
              name=""
              id=""
            />
            <button type="submit">Get Started</button>
          </form>
        </ui-card>
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
  font-size: 20.7rem;
  font-weight: 800;
  text-align: center;
  color: var(--color-grey-light-2);
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
  width: 60vw;
  height: 72vh;
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
  left: 3rem; /* This is equal to 42px */
  font-family: "Montserrat, sans-serif";
  font-size: 191.2%;
  font-weight: 800;
  color: var(--color-grey-light-3);
}

.lets-kick-now {
  position: absolute;
  top: 50%;
  left: 3rem; /* This is equal to 42px */
  font-family: "Montserrat, sans-serif";
  font-size: 2rem;
  color: var(--color-grey-light-3);
  transform: translateY(-50%);
  line-height: 1.1;
}

.lets-kick-now span {
  display: block;
  font-size: 1rem;
  color: var(--color-primary--2);
}

.form-card {
  width: 20vw;
  height: 50vh;
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
  font-family: "Manrope, sans-serif";
  font-weight: 200;
  font-size: 1.1rem;
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

.auth-input,
.auth-input:focus {
  padding: 0.8rem 0;
  outline: none !important;
  border: 0;
  border-bottom: 1px solid var(--color-grey-light-4);
  margin-bottom: 1.7rem;
}

.auth-input:active::before {
  color: var(--color-primary-light-4);
}
</style>
