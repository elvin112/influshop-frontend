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

      <div class="thumb-images">
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
      <h1 class="item-properties__title mb-sm">{{ itemName }}</h1>
      <div class="item-properties__title mb-sm">
        <span class="star-sign-container">
          <span
            class="fa fa-star"
            :class="{ checked: isFirstStrActive, hovered: isFirstStrHovered }"
            @mouseover="hoveringStar(1)"
            @mouseleave="cancelHoveringStart"
            @click="feedbackHandler(1)"
          >
          </span>
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
        <span class="average-stars">{{ averageStars }}</span>
        <span v-if="isFeedbackReceived" class="your-feedback-received"
          >Your feedback received!</span
        >
      </div>

      <p class="item-properties__description mb-sm">
        {{ itemDescription }}
      </p>
      <span class="warn-sign" @click="itemReportPopupHandler">
        <svg class="warn-sign__icon">
          <use xlink:href="../assets/img/sprite.svg#icon-warning" />
        </svg>
      </span>
      <hr />
      <div class="order-specification">
        <div class="quantityWprice">
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
          <button
            :disabled="itemLeft <= 0"
            @click="addToCartHandler"
            class="btn btn--primary mb-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div class="reviews mt-md">
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
      alertMsg: "Process done!",
      showAlertMsg: false,
      errMsg: "Something went wrong!",
      showErrMsg: false,
      itemName: null,
      itemDescription: null,
      itemPrice: null,
      itemImages: null,
      itemLeft: null,
      itemQuantity: 1,
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
      commentId: null,
      isFirstStrHovered: false,
      isSecondStrHovered: false,
      isThirdStrHovered: false,
      isFourthStrHovered: false,
      isFifthStrHovered: false,
      currentStar: null,
      isFeedbackReceived: false,
    };
  },
  async created() {
    await this.loadProduct(true);
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
        this.isFeedbackReceived = true;
      }
      const itemId = this.$route.params.itemId;
      this.itemId = itemId;
      let response = null;
      if (
        this.$store.getters["auth/isInfluencer"] === "true" ||
        this.$store.getters["auth/isInfluencer"] === null
      ) {
        response = await fetch(
          `http://localhost:8080/api/v1/item-ops/item/${itemId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else if (this.$store.getters["auth/isInfluencer"] === "false") {
        response = await fetch(
          `http://localhost:8080/api/v1/item-ops/item/${itemId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.$store.getters["auth/token"],
            },
          }
        );
      }
      if (!response?.ok) {
        alert("Something went wrong!");
      } else {
        const data = await response.json();
        this.itemName = data.item.name;
        this.itemDescription = data.item.description;
        this.itemPrice = data.item.price;
        this.itemImages = data.item.images;
        this.itemComments = data.item.comments;
        this.itemLeft = data.item.quantity;
        this.averageStars = parseFloat(data.item.averageStars).toFixed(2);
        if (this.averageStars === "NaN") {
          this.averageStars = "";
        }
        this.loadImages();
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
      console.log("running");
      try {
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
          const data = response.json();
          throw Error(data);
          return;
        } else {
          const data = await response.json();
          if (data.isPurchased === false) {
            this.alertMsg = "You haven't purchased this item before.";
            this.showAlertMsg = true;
            setTimeout(() => {
              this.showAlertMsg = false;
            }, 3000);
            return;
          } else {
            this.bringItemFeedbackCard = true;
          }
        }
      } catch (error) {
        this.errMsg = "You need to login.";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 3000);
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
    closeCommentReportPopup(result) {
      if (result === "reported") {
        this.alertMsg = "Comment successfully reported.";
        this.showAlertMsg = true;
        setTimeout(() => {
          this.showAlertMsg = false;
        }, 5000);
      } else if (result === "unreported") {
        this.alertMsg = "Comment successfully unreported.";
        this.showAlertMsg = true;
        setTimeout(() => {
          this.showAlertMsg = false;
        }, 5000);
      } else if (result === "error") {
        this.errMsg = "Comment could not be reported!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
      this.bringCommentReportCard = false;
    },
    closeItemReportPopup(result) {
      if (result === "reported") {
        this.alertMsg = "Item successfully reported.";
        this.showAlertMsg = true;
        setTimeout(() => {
          this.showAlertMsg = false;
        }, 5000);
      } else if (result === "unreported") {
        this.alertMsg = "Item successfully unreported.";
        this.showAlertMsg = true;
        setTimeout(() => {
          this.showAlertMsg = false;
        }, 5000);
      } else if (result === "error") {
        this.errMsg = "Item could not be reported!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
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
          console.log(this.itemComments[index]);

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
                isDislike: true,
              }),
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
                isLike: true,
              }),
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
@import "./ItemDetail.module.scss";

.checked {
  color: orange;
}

.hovered {
  color: var(--color-primary);
}

button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  box-shadow: none;
}
</style>
