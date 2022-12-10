<template>
  <BaseCard class="min-content">
    <template #header>
      <h2 class="header__title">
        Reporting abuse
        <svg class="close-sign__icon" @click="this.closeInfluencerReportPopup">
          <use xlink:href="../../assets/img/sprite.svg#icon-close" />
        </svg>
      </h2>
      <!-- icon-close -->

      <br />
      <div class="item-report-container">
        <div class="item-report-container__content">
          <div class="radio-control">
            <input type="radio" id="one" value="username" v-model="picked" />
            <label for="one">Inappropriate username</label>
          </div>

          <div class="radio-control">
            <input type="radio" id="two" value="description" v-model="picked" />
            <label for="two">Inappropriate shop description</label>
          </div>

          <div class="radio-control">
            <input type="radio" id="three" value="image" v-model="picked" />
            <label for="three">Inappropriate image</label>
          </div>

          <div class="radio-control">
            <input type="radio" id="four" value="other" v-model="picked" />
            <label for="four">Other</label>
          </div>

          <p class="report-progress-info" v-if="isReportControlled">
            Request rejected!
          </p>
          <p
            class="report-progress-info"
            v-else-if="isReportControlled === false"
            style="color: red"
          >
            Your request is reviewed.
          </p>
        </div>
      </div>
    </template>
    <template #buttons>
      <div v-if="!alreadyReported" class="form-button-control-2">
        <button
          class="btn btn--cancel"
          type="submit"
          @click="reportInfluencerHandler(true)"
        >
          Report
        </button>
        <button class="btn btn--success" @click="closeInfluencerReportPopup()">
          Cancel
        </button>
      </div>
      <div v-else class="form-button-control-2">
        <button class="btn btn--success" @click="updateReportInfluencerHandler">
          Update
        </button>
        <button
          class="btn btn--cancel"
          type="submit"
          @click="unreportInfluencerHandler()"
        >
          Unreport
        </button>
      </div>
    </template>
  </BaseCard>
</template>

<script>
export default {
  inject: ["closeInfluencerReportPopup"],
  props: ["influencerUsername"],
  data() {
    return {
      picked: "title",
      alreadyReported: false,
      prevRepReason: null,
      isReportControlled: null,
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
      username: this.influencerUsername,
      isReaderUser: isUser,
    };

    const response = await fetch(
      `http://localhost:8080/api/v1/report/influencer/read`,
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
      if (data.message.includes("Influencer Not Found")) {
        return;
      } else {
        const reason = data.influencerReport.report;
        console.log(reason);
        this.prevRepReason = reason;
        if (reason === "INAPPROPRIATE_USERNAME") {
          this.picked = "username";
        } else if (reason === "INAPPROPRIATE_SHOP_DESCRIPTION") {
          this.picked = "description";
        } else if (reason === "INAPPROPRIATE_IMAGE") {
          this.picked = "image";
        } else {
          this.picked = "other";
        }
        this.alreadyReported = true;
        this.isReportControlled = data.influencerReport.isReportControlled;
      }
    }
  },
  methods: {
    async unreportInfluencerHandler() {
      this.reportInfluencerHandler(false);
    },
    async updateReportInfluencerHandler() {
      let currentReason = null;
      if (this.picked === "username") {
        currentReason = "INAPPROPRIATE_USERNAME";
      } else if (this.picked === "description") {
        currentReason = "INAPPROPRIATE_SHOP_DESCRIPTION";
      } else if (this.picked === "image") {
        currentReason = "INAPPROPRIATE_IMAGE";
      } else {
        currentReason = "OTHER";
      }

      if (currentReason === this.prevRepReason) {
        return;
      } else {
        this.reportInfluencerHandler(true);
      }
    },
    async reportInfluencerHandler(isReport) {
      let pickedReportType = null;
      let isUser = null;

      if (this.$store.getters["auth/isInfluencer"] === "false") {
        isUser = true;
      } else if (this.$store.getters["auth/isInfluencer"] === "true") {
        isUser = false;
      }

      if (this.picked === "username") {
        pickedReportType = "INAPPROPRIATE_USERNAME";
      } else if (this.picked === "description") {
        pickedReportType = "INAPPROPRIATE_SHOP_DESCRIPTION";
      } else if (this.picked === "image") {
        pickedReportType = "INAPPROPRIATE_IMAGE";
      } else {
        pickedReportType = "OTHER";
      }
      if (isUser === null) {
        return;
      }

      const payload = {
        username: this.influencerUsername,
        reason: pickedReportType,
        isReporterUser: isUser,
        isReport: isReport,
      };
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/report/influencer/create`,
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
          if (isReport) {
            this.closeInfluencerReportPopup("reported");
          } else {
            this.closeInfluencerReportPopup("unreported");
          }
        }
      } catch (error) {
        this.closeInfluencerReportPopup("error");
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
.item-report-container {
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
