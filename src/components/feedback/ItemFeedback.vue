<template>
  <BaseCard class="min-content">
    <template #header>
      <h2 class="feedback-header__title">
        Rate product
        <svg
          class="header-title close-sign__icon"
          @click="this.closeItemFeedbackPopup()"
        >
          <use xlink:href="../../assets/img/sprite.svg#icon-close" />
        </svg>
      </h2>
      <!-- icon-close -->

      <br />
      <div class="item-feedback-container">
        <div class="item-feedback-container__content">
          <span class="feedback-star-container">
            <span
              class="fa fa-star fa-lg feedback-star"
              :class="{
                'feedback-star-container__checked': isFirstStrActive,
                'feedback-star-container__hovered': isFirstStrHovered,
              }"
              @mouseover="hoveringStar(1)"
              @mouseleave="cancelHoveringStart"
              @click="starController(1)"
            ></span>
            <span
              class="fa fa-star fa-lg feedback-star"
              :class="{
                'feedback-star-container__checked': isSecondStrActive,
                'feedback-star-container__hovered': isSecondStrHovered,
              }"
              @mouseover="hoveringStar(2)"
              @mouseleave="cancelHoveringStart"
              @click="starController(2)"
            ></span>
            <span
              class="fa fa-star fa-lg feedback-star"
              :class="{
                'feedback-star-container__checked': isThirdStrActive,
                'feedback-star-container__hovered': isThirdStrHovered,
              }"
              @mouseover="hoveringStar(3)"
              @mouseleave="cancelHoveringStart"
              @click="starController(3)"
            ></span>
            <span
              class="fa fa-star fa-lg feedback-star"
              :class="{
                'feedback-star-container__checked': isFourthStrActive,
                'feedback-star-container__hovered': isFourthStrHovered,
              }"
              @mouseover="hoveringStar(4)"
              @mouseleave="cancelHoveringStart"
              @click="starController(4)"
            ></span>
            <span
              class="fa fa-star fa-lg feedback-star"
              :class="{
                'feedback-star-container__checked': isFifthStrActive,
                'feedback-star-container__hovered': isFifthStrHovered,
              }"
              @mouseover="hoveringStar(5)"
              @mouseleave="cancelHoveringStart"
              @click="starController(5)"
            ></span>
          </span>

          <div class="comment-container">
            <p class="comment-container__title">
              Enter your opinion about product<br />(Optional)
            </p>
            <textarea
              v-model="comment"
              class="comment-container__textarea"
            ></textarea>
          </div>
        </div>
      </div>
    </template>
    <template #buttons>
      <div class="form-button-control-2">
        <button class="btn btn--success" type="submit" @click="rateHandler">
          Rate
        </button>
        <button class="btn btn--cancel" @click="closeItemFeedbackPopup()">
          Cancel
        </button>
      </div>
    </template>
  </BaseCard>
</template>

<script>
export default {
  inject: ["closeItemFeedbackPopup"],
  props: ["itemId", "stars"],
  data() {
    return {
      isFirstStrHovered: false,
      isSecondStrHovered: false,
      isThirdStrHovered: false,
      isFourthStrHovered: false,
      isFifthStrHovered: false,
      currentStar: null,
      comment: "",
    };
  },
  computed: {
    isFirstStrActive() {
      return this.currentStar >= 1;
    },
    isSecondStrActive() {
      return this.currentStar >= 2;
    },
    isThirdStrActive() {
      return this.currentStar >= 3;
    },
    isFourthStrActive() {
      return this.currentStar >= 4;
    },
    isFifthStrActive() {
      return this.currentStar >= 5;
    },
  },
  async created() {
    // read item report status
    let isUser = null;

    if (this.$store.getters["auth/isInfluencer"] === "false") {
      isUser = true;
    } else if (this.$store.getters["auth/isInfluencer"] === "true") {
      isUser = false;
    }

    if (isUser === null) {
      return;
    }

    this.currentStar = this.stars;
  },
  methods: {
    starController(stars) {
      this.currentStar = stars;
    },
    cancelHoveringStart() {
      this.isFirstStrHovered = false;
      this.isSecondStrHovered = false;
      this.isThirdStrHovered = false;
      this.isFourthStrHovered = false;
      this.isFifthStrHovered = false;
    },
    hoveringStar(n) {
      this.isFirstStrHovered = false;
      this.isSecondStrHovered = false;
      this.isThirdStrHovered = false;
      this.isFourthStrHovered = false;
      this.isFifthStrHovered = false;

      switch (n) {
        case 1:
          this.isFirstStrHovered = true;
          break;

        case 2:
          this.isFirstStrHovered = true;
          this.isSecondStrHovered = true;
          break;

        case 3:
          this.isFirstStrHovered = true;
          this.isSecondStrHovered = true;
          this.isThirdStrHovered = true;
          break;

        case 4:
          this.isFirstStrHovered = true;
          this.isSecondStrHovered = true;
          this.isThirdStrHovered = true;
          this.isFourthStrHovered = true;
          break;

        case 5:
          this.isFirstStrHovered = true;
          this.isSecondStrHovered = true;
          this.isThirdStrHovered = true;
          this.isFourthStrHovered = true;
          this.isFifthStrHovered = true;
          break;
      }
    },

    async commentHandler() {
      const payload = {
        itemId: this.itemId,
        comment: this.comment,
      };
      console.log(payload);
      const response = await fetch(`http://localhost:8080/api/v1/comment/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.getters["auth/token"],
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        alert("Something went wrong!");
      } else {
        return true;
      }
    },

    async rateHandler() {
      let pickedReportType = null;
      let isUser = null;

      if (this.$store.getters["auth/isInfluencer"] === "false") {
        isUser = true;
      } else if (this.$store.getters["auth/isInfluencer"] === "true") {
        isUser = false;
      }

      if (isUser === null) {
        return;
      }

      if (this.comment !== "") {
        const response = await this.commentHandler();

        if (!response) {
          alert("Something went wrong. Please try again later!");
          return;
        }
      }

      const payload = {
        itemId: this.itemId,
        stars: this.currentStar,
      };

      const response = await fetch(`http://localhost:8080/api/v1/star/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.getters["auth/token"],
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        alert("Something went wrong!");
      } else {
        this.closeItemFeedbackPopup(true);
      }
    },
  },
};
</script>

<style>
.feedback-header__title {
  font-family: "Montserrat", sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  text-align: center;
}
.form-button-control-2 {
  margin-top: 3.5rem;
}
.header__par {
  font-family: "Montserrat", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
}

.comment-container {
  width: 70%;
  margin: 1.7rem auto;
}

.comment-container__title {
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 500;
}

.comment-container__textarea {
  width: 100%;
  height: 8rem;
  padding: 0.3rem;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
}
.item-feedback-container {
  position: relative;
}
.feedback-star {
  width: 3rem;
}
.header-title {
  width: 1.5rem;
  height: 1.5rem;
  fill: black;
  /* stroke: #ffff; */
  cursor: pointer;
  right: 1.2rem;
  position: absolute;
}
.btn {
  padding: 0.53rem 1.47rem;
  width: 100%;
}
.btn:not(last-child) {
  margin-right: 1rem;
}

p {
  font-family: "Montserrat", sans-serif;
}

.item-feedback-container__content {
  margin: 0 auto;
  text-align: center;
}

.feedback-star-container__checked {
  color: orange;
}

.feedback-star-container__hovered {
  color: var(--color-primary);
}
</style>
