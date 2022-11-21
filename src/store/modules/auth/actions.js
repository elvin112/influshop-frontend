let timer;
export default {
  async signin(context, payload) {
    const response = await fetch(
      `http://localhost:8080/api/v1/auth/${payload.pickedUserType}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      }
    );

    const responseData = await response.clone().json();
    console.log(responseData);
    if (!response.ok) {
      return response.clone();
    }

    const tokenTestExpiration = 3600;
    const expiresIn = tokenTestExpiration * 1000;
    const expirationDate = new Date().getTime() + expiresIn;
    let isInfluencer;
    if (payload.pickedUserType === "influencer") {
      isInfluencer = true;
    } else {
      isInfluencer = false;
    }

    localStorage.setItem("username", responseData.username);
    localStorage.setItem("email", responseData.email);
    localStorage.setItem("token", responseData.token);
    localStorage.setItem("tokenExpiration", expirationDate);
    localStorage.setItem("isInfluencer", isInfluencer);

    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      username: responseData.username,
      email: responseData.email,
      token: responseData.token,
      isInfluencer: isInfluencer,
    });

    return response.clone();
  },

  tryLogin(context) {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const isInfluencer = localStorage.getItem("isInfluencer");

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token && email) {
      context.commit("setUser", {
        username: username,
        email: email,
        token: token,
        isInfluencer: isInfluencer,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("isInfluencer");

    clearTimeout(timer);

    context.commit("setUser", {
      username: null,
      email: null,
      token: null,
      isInfluencer: null,
    });
  },

  autoLogout(context) {
    console.log("autoLogout started!");
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
