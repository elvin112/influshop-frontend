<template>
  <TheHeader />
  <Transition>
    <ErrorMsg v-if="showErrMsg" :msg="errMsg" />
  </Transition>
  <Transition>
    <SimpleAlertMsg v-if="showAlertMsg" :msg="alertMsg" />
  </Transition>
  <div class="wrapper mt-sm">
    <ItemReport v-if="bringItemReportCard" :itemId="itemId" />
    <CommentReport v-if="bringCommentReportCard" :commentId="commentId" />
    <ItemFeedback
      v-if="bringItemFeedbackCard"
      :itemId="itemId"
      :stars="currentStar"
    />

    <CommentDeletionSimplePopup
      v-if="bringCommentDeletionCard"
      :commentId="commentId"
    />

    <div class="image-viewer">
      <div class="main-img-container">
        <img
          src="../assets/img/no-img-placeholder.jpeg"
          alt=""
          class="main-img"
          ref="main-img"
        />
      </div>

      <div class="thumb-images" ref="thumb-images" style="visibility: hidden">
        <img
          src="../assets/img/no-img-placeholder.jpeg"
          alt=""
          class="thumb-images__item"
          ref="thumb-img-1"
          display="none"
          :class="{ active: isThumb1 }"
          @click="changePicture($event, 'thumb-1')"
        />
        <img
          src="../assets/img/no-img-placeholder.jpeg"
          alt=""
          class="thumb-images__item"
          ref="thumb-img-2"
          display="none"
          :class="{ active: isThumb2 }"
          @click="changePicture($event, 'thumb-2')"
        />
        <img
          src="../assets/img/no-img-placeholder.jpeg"
          alt=""
          class="thumb-images__item"
          ref="thumb-img-3"
          display="none"
          :class="{ active: isThumb3 }"
          @click="changePicture($event, 'thumb-3')"
        />
        <img
          src="../assets/img/no-img-placeholder.jpeg"
          alt=""
          class="thumb-images__item"
          ref="thumb-img-4"
          display="none"
          :class="{ active: isThumb4 }"
          @click="changePicture($event, 'thumb-4')"
        />
        <img
          src="../assets/img/no-img-placeholder.jpeg"
          alt=""
          class="thumb-images__item"
          ref="thumb-img-5"
          display="none"
          :class="{ active: isThumb5 }"
          @click="changePicture($event, 'thumb-5')"
        />
      </div>
    </div>
    <div class="item-properties">
      <h1 class="item-properties__title mb-sm">
        {{ itemName !== null ? itemName : itemGroupName }}
      </h1>
      <div class="item-properties__title mb-sm">
        <span class="star-sign-container" style="display: none">
          <span
            class="fa fa-star"
            :class="{ checked: isFirstStrActive, hovered: isFirstStrHovered }"
            @mouseover="hoveringStar(1)"
            @mouseleave="cancelHoveringStart"
            @click="feedbackHandler(1)"
          ></span>
          <span
            class="fa fa-star"
            :class="{ checked: isSecondStrActive, hovered: isSecondStrHovered }"
            @mouseover="hoveringStar(2)"
            @mouseleave="cancelHoveringStart"
            @click="feedbackHandler(2)"
          ></span>
          <span
            class="fa fa-star"
            :class="{ checked: isThirdStrActive, hovered: isThirdStrHovered }"
            @mouseover="hoveringStar(3)"
            @mouseleave="cancelHoveringStart"
            @click="feedbackHandler(3)"
          ></span>
          <span
            class="fa fa-star"
            :class="{ checked: isFourthStrActive, hovered: isFourthStrHovered }"
            @mouseover="hoveringStar(4)"
            @mouseleave="cancelHoveringStart"
            @click="feedbackHandler(4)"
          ></span>
          <span
            class="fa fa-star"
            :class="{ checked: isFifthStrActive, hovered: isFifthStrHovered }"
            @mouseover="hoveringStar(5)"
            @mouseleave="cancelHoveringStart"
            @click="feedbackHandler(5)"
          ></span>
        </span>
        <span class="average-stars" style="display: none">{{
          averageStars
        }}</span>
        <span v-if="isFeedbackReceived" class="your-feedback-received"
          >Your feedback received!</span
        >
      </div>

      <p class="item-properties__description mb-sm">
        {{ itemDescription !== null ? itemDescription : itemGroupDescription }}
      </p>
      <span
        class="warn-sign"
        @click="itemReportPopupHandler"
        style="visibility: hidden"
      >
        <svg class="warn-sign__icon">
          <use xlink:href="../assets/img/sprite.svg#icon-warning" />
        </svg>
      </span>
      <hr />
      <div class="order-specification">
        <div class="order-specification__extraFeatures">
          <p class="extraFeatuers-title">SELECT FEATURE</p>
          <div class="extraFeatures__select-container">
            <select
              name=""
              id=""
              ref=""
              :key="prop"
              v-for="prop in listOfProperties"
              class="feature-select"
              @change="featureOptionHandler(false)"
            >
              <option
                selected="true"
                disabled="disabled"
                :value="prop"
                :key="prop"
                class="feature-name"
              >
                {{ prop }}
              </option>
              <option
                :key="elem"
                class="feature-content"
                :value="elem"
                v-for="elem in itemGroupExtraFeaturesConverted[prop]"
              >
                {{ elem }}
              </option>
            </select>
          </div>
        </div>

        <div class="quantityWprice" style="visibility: hidden">
          <div class="quantityWprice__price">
            <p class="price-text">${{ itemFinalPrice }}</p>
          </div>

          <div class="quantityWprice__quantity">
            <span class="quantityWprice__quantity--1" @click="decreaseQuantity"
              >-</span
            >
            <span>{{ itemQuantity }}</span>
            <span class="quantityWprice__quantity--3" @click="increaseQuantity"
              >+</span
            >
          </div>
          &nbsp;&nbsp;out of {{ itemLeft }} units
        </div>
        <div class="order-specification__buttons mt-sm">
          <!-- <button class="btn btn--outline">Add to Cart</button> -->
          <button @click="addToCartHandler" class="btn btn--primary mb-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div class="reviews mt-md" style="visibility: hidden">
      <h2 class="reviews-title mb-sm">Reviews</h2>

      <div
        class="review"
        v-for="(comment, index) in itemComments"
        :key="comment.id"
      >
        <div class="review__user-info">
          <img src="../assets/img/no-img-placeholder.jpeg" alt="" />
          <p class="user-info__name">{{ comment.username }}</p>
          <div class="tools">
            <span>
              {{ comment.likes }}
              <svg
                class="like-icon"
                v-if="comment.isLikedByUser"
                @click="unLikeItem(index)"
              >
                <use xlink:href="../assets/img/sprite.svg#icon-thumb-up1" />
              </svg>
              <svg
                class="like-icon"
                v-else-if="!comment.isLikedByUser"
                @click="likeItem(index)"
              >
                <use xlink:href="../assets/img/sprite.svg#icon-thumb-up" />
              </svg>
            </span>
            <span>
              {{ comment.dislikes }}

              <svg
                class="dislike-icon"
                v-if="comment.isDislikedByUser"
                @click="unDislikeItem(index)"
              >
                <use xlink:href="../assets/img/sprite.svg#icon-thumb-down1" />
              </svg>
              <svg
                class="dislike-icon"
                v-else-if="!comment.isDislikedByUser"
                @click="dislikeItem(index)"
              >
                <use xlink:href="../assets/img/sprite.svg#icon-thumb-down" />
              </svg>
            </span>

            <span @click="commentReportPopupHandler(comment.id)">
              <svg class="warn-sign-icon">
                <use xlink:href="../assets/img/sprite.svg#icon-warning" />
              </svg>
            </span>

            <span
              v-if="comment.username === username"
              @click="commentDeletionPopupHandler(comment.id)"
            >
              <svg class="delete-comment-icon">
                <use xlink:href="../assets/img/sprite.svg#icon-bin" />
              </svg>
            </span>
          </div>
        </div>
        <div class="review__user-comment mt-sm">
          <p>
            {{ comment.comment }}
          </p>
        </div>
        <hr class="mt-md" />
      </div>
    </div>
  </div>
  <TheFooter />
</template>

<script>
import ItemReport from "../components/report/ItemReport.vue";
import CommentReport from "../components/report/CommentReport.vue";
import ItemFeedback from "../components/feedback/ItemFeedback.vue";
import CommentDeletionSimplePopup from "../components/feedback/CommentDeletionSimplePopup.vue";

import { isProxy, toRaw } from "vue";
import { Cloudinary } from "cloudinary-core"; // If your code is for ES6 or higher

var cl = new Cloudinary({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  secure: true,
});

let frame1 = undefined;

export default {
  provide() {
    return {
      closeItemReportPopup: this.closeItemReportPopup,
      closeCommentReportPopup: this.closeCommentReportPopup,
      closeItemFeedbackPopup: this.closeItemFeedbackPopup,
      closeCommentDeletionPopup: this.closeCommentDeletionPopup,
      deleteComment: this.deleteComment,
      closeErrMsg: this.closeErrMsg,
      closeAlertMsg: this.closeAlertMsg,
    };
  },

  data() {
    return {
      errMsg: "Something went wrong!",
      alertMsg: "Process done!",
      showErrMsg: false,
      showAlertMsg: false,
      itemGroupName: null,
      itemGroupDescription: null,
      itemGroupImage: null,
      itemGroupExtraFeatures: null,
      itemGroupExtraFeaturesConverted: null,
      itemName: null,
      itemDescription: null,
      listOfProperties: null,
      itemPrice: null,
      itemImages: null,
      itemQuantity: 1,
      itemLeft: null,
      averageStars: 0,
      itemComments: [],
      isThumb1: true,
      isThumb2: false,
      isThumb3: false,
      isThumb4: false,
      isThumb5: false,
      timer: null,
      timer2: null,
      bringItemReportCard: false,
      bringCommentReportCard: false,
      bringItemFeedbackCard: false,
      bringCommentDeletionCard: false,
      itemId: null,
      itemGroupId: null,
      commentId: null,
      isFirstStrHovered: false,
      isSecondStrHovered: false,
      isThirdStrHovered: false,
      isFourthStrHovered: false,
      isFifthStrHovered: false,
      currentStar: null,
      isFeedbackReceived: false,
      itemGroupOwnerName: null,
    };
  },
  async created() {
    this.loadProduct(true);
  },
  computed: {
    username() {
      return this.$store.getters["auth/username"];
    },
    itemFinalPrice() {
      return this.itemPrice * this.itemQuantity;
    },
    isFirstStrActive() {
      return this.averageStars;
    },
    isSecondStrActive() {
      return this.averageStars >= 2;
    },
    isThirdStrActive() {
      return this.averageStars >= 3;
    },
    isFourthStrActive() {
      return this.averageStars >= 4;
    },
    isFifthStrActive() {
      return this.averageStars >= 5;
    },
  },
  methods: {
    closeErrMsg() {
      this.showErrMsg = false;
    },
    closeAlertMsg() {
      this.showAlertMsg = false;
    },
    async addToCartHandler() {
      if (this.itemLeft <= 0) {
        return;
      }
      const payload = {
        itemId: this.itemId,
        quantity: this.itemQuantity,
        isAddToCart: true,
      };
      try {
        const response = await this.$store.dispatch(
          "cart/addItemToCart",
          payload
        );

        if (!response.ok) {
          let errMsg = null;
          errMsg = await response.json();
          throw errMsg;
        } else {
          // alert("Item added!");
          this.alertMsg = "Item added to cart";
          this.showAlertMsg = true;
          setTimeout(() => {
            this.showAlertMsg = false;
          }, 5000);
        }
      } catch (error) {
        this.errMsg = error?.message || "Item could not be added!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
    },
    async deleteComment() {
      const response = await fetch(
        `http://localhost:8080/api/v1/comment/${this.commentId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.getters["auth/token"],
          },
        }
      );

      if (!response.ok) {
        // comment not deleted; error handler
        return;
      } else {
        const data = await response.json();
        this.itemComments = this.itemComments.filter(
          (comment) => comment.id !== this.commentId
        );
      }
      this.closeCommentDeletionPopup();
    },

    closeCommentDeletionPopup() {
      this.bringCommentDeletionCard = false;
    },
    commentDeletionPopupHandler(commentId) {
      this.commentId = commentId;
      this.bringCommentDeletionCard = true;
    },
    async loadProduct(firstTime) {
      if (!firstTime) {
        let queryParams = "";
        if (this.$route.query) {
          const queryObj = this.$route.query;

          let featureSelectNodes =
            document.getElementsByClassName("feature-select");
          let featureNodes = document.getElementsByClassName("feature-name");
          let featureContentNodes =
            document.getElementsByClassName("feature-content");

          let index = 0;
          for (const property in queryObj) {
            if (index !== 0) {
              queryParams += "&";
            }

            // featureSelectNodes[index].value = queryObj[property];

            queryParams += `${property}=${queryObj[property]}`;
            index++;
          }
        }

        this.isFeedbackReceived = true;
        this.featureOptionHandler(queryParams);
        return;
      }

      const itemGroupId = this.$route.params.itemGroupId;
      this.itemGroupId = itemGroupId;

      const response = await fetch(
        `http://localhost:8080/api/v1/item-ops/item-group/${itemGroupId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        alert("Something went wrong!");
      } else {
        const data = await response.json();
        this.itemGroupName = data.itemGroup.itemGroupName;
        this.itemGroupDescription = data.itemGroup.itemGroupDescription;
        this.itemGroupImage = data.itemGroup.imageLocation;
        this.itemGroupExtraFeatures = data.itemGroup.extraFeatures;
        this.itemGroupOwnerName = data.itemGroup.influencerName;
        this.loadGroupImage();
        this.loadExtraFeatures();
        if (this.$route.query) {
          const queryObj = this.$route.query;

          let featureSelectNodes =
            document.getElementsByClassName("feature-select");
          let featureNodes = document.getElementsByClassName("feature-name");
          let featureContentNodes =
            document.getElementsByClassName("feature-content");

          let queryParams = "";
          let index = 0;
          for (const property in queryObj) {
            if (index !== 0) {
              queryParams += "&";
            }

            // featureSelectNodes[index].value = queryObj[property];

            queryParams += `${property}=${queryObj[property]}`;
            index++;
          }
          this.featureOptionHandler(queryParams);
        }
      }
    },

    async featureOptionHandler(queryParam) {
      let queryParams = "";
      if (!queryParam) {
        this.isFeedbackReceived = false;
        const featureSelectNodes =
          document.getElementsByClassName("feature-select");
        const featureNodes = document.getElementsByClassName("feature-name");
        const featureContentNodes =
          document.getElementsByClassName("feature-content");

        for (let index = 0; index < featureNodes.length; index++) {
          if (index !== 0) {
            queryParams += "&";
          }
          const prop = featureNodes[index].innerHTML;
          const cont = featureSelectNodes[index].value;
          queryParams += `${prop}=${cont}`;
        }
        this.$router.push(
          `/itemGroupDetail/${this.itemGroupId}?${queryParams}`
        );
      } else {
        queryParams = queryParam;
      }

      const response = await fetch(
        `http://localhost:8080/api/v1/item-ops/item/${this.itemGroupOwnerName}/${this.itemGroupName}/extra?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        this.setItemGroupMode();
      } else {
        const data = await response.json();
        this.itemId = data.item.id;
        this.itemName = data.item.name;
        this.itemDescription = data.item.description;
        this.itemPrice = data.item.price;
        this.itemImages = data.item.images;
        this.itemComments = data.item.comments;
        this.itemLeft = data.item.quantity;
        this.averageStars = parseFloat(data.item.averageStars).toFixed(2);
        if (this.averageStars === "NaN") {
          this.averageStars = 0;
        }
        this.loadImages();
        this.setFlatItemMode();
      }
    },
    setItemGroupMode() {
      this.itemName = null;
      this.itemDescription = null;
      this.itemPrice = null;
      this.itemImages = null;
      this.itemComments = null;
      this.itemLeft = null;
      this.averageStars = null;
      this.loadGroupImage();
      this.loadExtraFeatures();
      const thumbNode = this.$refs["thumb-images"];
      thumbNode.style.visibility = "hidden";
      const feedbackStar = document.getElementsByClassName(
        "star-sign-container"
      )[0];
      feedbackStar.style.display = "none";

      const averageStars = document.getElementsByClassName("average-stars")[0];
      averageStars.style.display = "none";

      const warnSign = document.getElementsByClassName("warn-sign")[0];
      warnSign.style.visibility = "hidden";

      const quantityWprice =
        document.getElementsByClassName("quantityWprice")[0];
      quantityWprice.style.visibility = "hidden";

      const reviews = document.getElementsByClassName("reviews")[0];
      reviews.style.visibility = "hidden";

      // disabled-button
      const button1 = document.getElementsByClassName("disabled-button")[0];
      const button2 = document.getElementsByClassName("disabled-button")[1];
      button1.disabled = true;
      button2.disabled = true;
    },
    setFlatItemMode() {
      const thumbNode = this.$refs["thumb-images"];
      thumbNode.style.visibility = "visible";
      const feedbackStar = document.getElementsByClassName(
        "star-sign-container"
      )[0];
      feedbackStar.style.display = "unset";
      const averageStars = document.getElementsByClassName("average-stars")[0];
      averageStars.style.display = "unset";

      const warnSign = document.getElementsByClassName("warn-sign")[0];
      warnSign.style.visibility = "visible";

      const quantityWprice =
        document.getElementsByClassName("quantityWprice")[0];
      quantityWprice.style.visibility = "visible";

      const reviews = document.getElementsByClassName("reviews")[0];
      reviews.style.visibility = "visible";

      // disabled-button
      const button1 = document.getElementsByClassName("disabled-button")[0];
      const button2 = document.getElementsByClassName("disabled-button")[1];
      button1.disabled = false;
      button2.disabled = false;
    },
    loadExtraFeatures() {
      this.listOfProperties = [];
      const imgObj = toRaw(this.itemGroupImage);

      let itemGroupExtraFeaturesTemp = toRaw(this.itemGroupExtraFeatures);
      this.itemGroupExtraFeaturesConverted = itemGroupExtraFeaturesTemp;
      for (const elem in itemGroupExtraFeaturesTemp) {
        this.listOfProperties.push(elem);
      }
    },
    closeItemFeedbackPopup(isCreated) {
      if (isCreated) {
        this.loadProduct(false);
      }
      this.bringItemFeedbackCard = false;
    },
    async feedbackHandler(numOfStar) {
      this.currentStar = numOfStar;
      // check whether item is purchased by the user
      const response = await fetch(
        `http://localhost:8080/api/v1/comment/is-purchased/${this.itemId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.getters["auth/token"],
          },
        }
      );

      if (!response.ok) {
        return;
      } else {
        const data = await response.json();
        if (data.isPurchased === false) {
          return;
        } else {
          this.bringItemFeedbackCard = true;
        }
      }
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
    closeCommentReportPopup() {
      this.bringCommentReportCard = false;
    },
    closeItemReportPopup() {
      this.bringItemReportCard = false;
    },
    commentReportPopupHandler(commentId) {
      this.commentId = commentId;
      this.bringCommentReportCard = true;
    },
    itemReportPopupHandler() {
      this.bringItemReportCard = true;
    },
    async unDislikeItem(index) {
      if (this.itemComments[index].isDislikedByUser == true) {
        if (this.timer) {
          clearTimeout(this.timer);
          console.log("undislike timer cleaned");
        }
        this.timer = setTimeout(async () => {
          const response = await fetch(
            `http://localhost:8080/api/v1/comment/dislike`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.$store.getters["auth/token"],
              },
              body: JSON.stringify({
                commentId: this.itemComments[index].id + "",
                isDislike: false,
              }),
            }
          );
          if (!response.ok) {
            console.log("undislike not successful");
          } else {
            console.log("undislike is successful");
            this.itemComments[index].dislikes--;
            this.itemComments[index].isDislikedByUser = false;
          }
        }, 400);
      }
    },
    async dislikeItem(index) {
      if (this.itemComments[index].isDislikedByUser == false) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(async () => {
          if (this.itemComments[index].isLikedByUser == true) {
            await this.unLikeItem(index);
            return;
          }

          const payload = {
            commentId: this.itemComments[index].id + "",
            isDislike: true,
          };

          const response = await fetch(
            `http://localhost:8080/api/v1/comment/dislike`,
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
            console.log("dislike not successful");
          } else {
            console.log("dislike is successful");
            this.itemComments[index].dislikes++;
            this.itemComments[index].isDislikedByUser = true;
          }
        }, 400);
      }
    },
    async unLikeItem(index) {
      if (this.itemComments[index].isLikedByUser == true) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(async () => {
          const response = await fetch(
            `http://localhost:8080/api/v1/comment/like`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.$store.getters["auth/token"],
              },
              body: JSON.stringify({
                commentId: this.itemComments[index].id + "",
                isLike: false,
              }),
            }
          );
          if (!response.ok) {
            console.log("unlike not successful");
          } else {
            this.itemComments[index].likes--;
            this.itemComments[index].isLikedByUser = false;
          }
        }, 400);
      }
    },
    async likeItem(index) {
      if (this.itemComments[index].isLikedByUser == false) {
        if (this.timer2) {
          clearTimeout(this.timer2);
        }
        this.timer2 = setTimeout(async () => {
          if (this.itemComments[index].isDislikedByUser == true) {
            await this.unDislikeItem(index);
            return;
          }
          const payload = {
            commentId: this.itemComments[index].id + "",
            isLike: true,
          };
          const response = await fetch(
            `http://localhost:8080/api/v1/comment/like`,
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
            console.log("like not successful");
          } else {
            this.itemComments[index].likes++;
            this.itemComments[index].isLikedByUser = true;
          }
        }, 400);
      }
    },
    changePicture(event, msg) {
      this.isThumb1 = false;
      this.isThumb2 = false;
      this.isThumb3 = false;
      this.isThumb4 = false;
      this.isThumb5 = false;
      frame1 = this.$refs["main-img"];
      let frame12 = null;
      switch (msg) {
        case "thumb-1":
          this.isThumb1 = true;
          frame12 = this.$refs["thumb-img-1"];
          frame1.src = frame12.src;
          break;
        case "thumb-2":
          this.isThumb2 = true;
          frame12 = this.$refs["thumb-img-2"];
          frame1.src = frame12.src;
          break;
        case "thumb-3":
          this.isThumb3 = true;
          frame12 = this.$refs["thumb-img-3"];
          frame1.src = frame12.src;
          break;
        case "thumb-4":
          this.isThumb4 = true;
          frame12 = this.$refs["thumb-img-4"];
          frame1.src = frame12.src;
          break;
        case "thumb-5":
          this.isThumb5 = true;
          frame12 = this.$refs["thumb-img-5"];
          frame1.src = frame12.src;
          break;
      }
    },
    increaseQuantity() {
      if (this.itemQuantity >= this.itemLeft) {
        return;
      }
      this.itemQuantity++;
    },
    decreaseQuantity() {
      if (this.itemQuantity !== 1) {
        this.itemQuantity--;
      }
    },
    loadGroupImage() {
      const imgObj = toRaw(this.itemGroupImage);
      frame1 = this.$refs["main-img"];
      // thumbImages = this.$refs["thumb-images"];
      // thumbImages.display = "none";
      frame1.src = cl.image(imgObj).src;
    },
    loadImages() {
      for (let index = 0; index < this.itemImages.length; index++) {
        const imgObj = toRaw(this.itemImages[index]);
        switch (imgObj.imageOrder) {
          case 1:
            frame1 = this.$refs["main-img"];
            const frame12 = this.$refs["thumb-img-1"];
            frame1.src = cl.image(imgObj.imageLocation).src;
            frame12.src = cl.image(imgObj.imageLocation).src;
            frame12.display = "inline-block";
            break;
          case 2:
            if (frame1 === undefined) {
              frame1 = this.$refs["main-img"];
              frame1.src = cl.image(imgObj.imageLocation).src;
            }
            const frame2 = this.$refs["thumb-img-2"];
            frame2.src = cl.image(imgObj.imageLocation).src;
            frame2.display = "inline-block";
            break;
          case 3:
            if (frame1 === undefined) {
              frame1 = this.$refs["main-img"];
              frame1.src = cl.image(imgObj.imageLocation).src;
            }
            const frame3 = this.$refs["thumb-img-3"];
            frame3.src = cl.image(imgObj.imageLocation).src;
            frame3.display = "inline-block";
            break;
          case 4:
            if (frame1 === undefined) {
              frame1 = this.$refs["main-img"];
              frame1.src = cl.image(imgObj.imageLocation).src;
            }
            const frame4 = this.$refs["thumb-img-4"];
            frame4.src = cl.image(imgObj.imageLocation).src;
            frame4.display = "inline-block";
            break;
          case 5:
            if (frame1 === undefined) {
              frame1 = this.$refs["main-img"];
              frame1.src = cl.image(imgObj.imageLocation).src;
            }
            const frame5 = this.$refs["thumb-img-5"];
            frame5.src = cl.image(imgObj.imageLocation).src;
            frame5.display = "none";
            break;
        }
      }
    },
  },
  components: {
    ItemReport,
    CommentReport,
    ItemFeedback,
    CommentDeletionSimplePopup,
  },
};
</script>

<style scoped lang="scss">
@import "./ItemGroupDetail.module.scss";

.checked {
  color: orange;
}

.hovered {
  color: var(--color-primary);
}

// button {
//   border: 1px solid #0066cc;
//   background-color: #0099cc;
//   color: #ffffff;
//   padding: 5px 10px;
// }

// button:hover {
//   border: 1px solid #0099cc;
//   background-color: #00aacc;
//   color: #ffffff;
//   padding: 5px 10px;
// }

span:disabled {
  background-color: #cccccc;
  color: #666666;
  box-shadow: none;
}

button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  box-shadow: none;
}
</style>
