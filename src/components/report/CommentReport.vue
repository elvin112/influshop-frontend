<template>
  <BaseCard class="min-content">
    <template #header>
      <h2 class="header__title">
        Reporting abuse
        <svg class="close-sign__icon" @click="this.closeCommentReportPopup">
          <use xlink:href="../../assets/img/sprite.svg#icon-close" />
        </svg>
      </h2>
      <!-- icon-close -->

      <br />
      <div class="comment-report-container">
        <div class="comment-report-container__content">
          <div class="radio-control">
            <input type="radio" id="one" value="comment" v-model="picked" />
            <label for="one">Inappropriate comment</label>
          </div>

          <div class="radio-control">
            <input type="radio" id="two" value="image" v-model="picked" />
            <label for="two">Inappropriate image</label>
          </div>

          <div class="radio-control">
            <input type="radio" id="four" value="other" v-model="picked" />
            <label for="four">Other</label>
          </div>
        </div>
      </div>
    </template>
    <template #buttons>
      <div v-if="!alreadyReported" class="form-button-control-2">
        <button
          class="btn btn--cancel"
          type="submit"
          @click="reportCommentHandler(true)"
        >
          Report
        </button>
        <button class="btn btn--success" @click="closeCommentReportPopup()">
          Cancel
        </button>
      </div>
      <div v-else class="form-button-control-2">
        <button class="btn btn--success" @click="updateReportCommentHandler">
          Update
        </button>
        <button
          class="btn btn--cancel"
          type="submit"
          @click="unreportCommentHandler()"
        >
          Unreport
        </button>
      </div>
    </template>
  </BaseCard>
</template>

<script>
export default {
  inject: ["closeCommentReportPopup"],
  props: ["commentId"],
  data() {
    return {
      picked: "title",
      alreadyReported: false,
      prevRepReason: null,
    };
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

    const payload = {
      commentId: this.commentId,
      isReaderUser: isUser,
    };

    const response = await fetch(
      `http://localhost:8080/api/v1/report/comment/read`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.getters["auth/token"],
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw Error("Something went wrong");
    } else {
      const data = await response.json();
      if (data.message.includes("Comment Report Not Found")) {
        return;
      } else {
        const reason = data.commentReport.report;
        this.prevRepReason = reason;
        if (reason === "INAPPROPRIATE_COMMENT") {
          this.picked = "comment";
        } else if (reason === "INAPPROPRIATE_IMAGE") {
          this.picked = "image";
        } else {
          this.picked = "other";
        }
        this.alreadyReported = true;
      }
    }
  },
  methods: {
    async unreportCommentHandler() {
      this.reportCommentHandler(false);
    },
    async updateReportCommentHandler() {
      let currentReason = null;
      if (this.picked === "comment") {
        currentReason = "INAPPROPRIATE_COMMENT";
      } else if (this.picked === "image") {
        currentReason = "INAPPROPRIATE_IMAGE";
      } else {
        currentReason = "OTHER";
      }

      if (currentReason === this.prevRepReason) {
        return;
      } else {
        this.reportCommentHandler(true);
      }
    },
    async reportCommentHandler(isReport) {
      let pickedReportType = null;
      let isUser = null;

      if (this.$store.getters["auth/isInfluencer"] === "false") {
        isUser = true;
      } else if (this.$store.getters["auth/isInfluencer"] === "true") {
        isUser = false;
      }

      if (this.picked === "comment") {
        pickedReportType = "INAPPROPRIATE_COMMENT";
      } else if (this.picked === "image") {
        pickedReportType = "INAPPROPRIATE_IMAGE";
      } else {
        pickedReportType = "OTHER";
      }
      if (isUser === null) {
        return;
      }

      const payload = {
        commentId: this.commentId,
        reason: pickedReportType,
        isReporterUser: isUser,
        isReport: isReport,
      };
      const response = await fetch(
        `http://localhost:8080/api/v1/report/comment/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.getters["auth/token"],
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw Error("Something went wrong");
      } else {
        alert("OK!");
        this.closeCommentReportPopup();
      }
    },
  },
};
</script>

<style>
.header__title {
  font-family: "Montserrat", sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
}

.header__par {
  font-family: "Montserrat", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
}

.radio-control {
  padding: 0.2rem 0;
}

.radio-control label {
  font-family: "Montserrat", sans-serif;

  font-size: 1.1rem;
  margin-left: 0.2rem;
  cursor: pointer;
}

.radio-control input[type="radio"] {
  border: 0px;
  width: 5%;
  height: 1.3em;
  cursor: pointer;
}
.comment-report-container {
  position: relative;
}

.close-sign__icon {
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
</style>
