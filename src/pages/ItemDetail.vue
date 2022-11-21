<template>
  <TheHeader />
  <div class="wrapper mt-sm">
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
        <span>
          <svg class="star-sign__icon">
            <use xlink:href="../assets/img/sprite.svg#icon-star-full" />
          </svg>
          <svg class="star-sign__icon">
            <use xlink:href="../assets/img/sprite.svg#icon-star-full" />
          </svg>
          <svg class="star-sign__icon">
            <use xlink:href="../assets/img/sprite.svg#icon-star-full" />
          </svg>
          <svg class="star-sign__icon">
            <use xlink:href="../assets/img/sprite.svg#icon-star-full" />
          </svg>
          <svg class="star-sign__icon">
            <use xlink:href="../assets/img/sprite.svg#icon-star-full" />
          </svg>
        </span>
      </div>

      <p class="item-properties__description mb-sm">
        {{ itemDescription }}
      </p>
      <span class="warn-sign">
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
        </div>

        <div class="order-specification__buttons mt-sm">
          <button class="btn btn--outline">Add to Cart</button>
          <button class="btn btn--primary mb-sm">Buy Now</button>
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

            <span>
              <svg class="warn-sign-icon">
                <use xlink:href="../assets/img/sprite.svg#icon-warning" />
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
import { isProxy, toRaw } from "vue";
import { Cloudinary } from "cloudinary-core"; // If your code is for ES6 or higher
var cl = new Cloudinary({
  cloud_name: "dd9wm6nm3",
  secure: true,
});

let frame1 = undefined;

export default {
  data() {
    return {
      itemName: null,
      itemDescription: null,
      itemPrice: null,
      itemImages: null,
      itemQuantity: 1,
      itemComments: [],
      isThumb1: true,
      isThumb2: false,
      isThumb3: false,
      isThumb4: false,
      isThumb5: false,
      timer: null,
    };
  },
  async created() {
    const itemId = this.$route.params.itemId;
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

    if (!response.ok) {
      alert("Something went wrong!");
    } else {
      const data = await response.json();
      this.itemName = data.item.name;
      this.itemDescription = data.item.description;
      this.itemPrice = data.item.price;
      this.itemImages = data.item.images;
      this.itemComments = data.item.comments;
      this.loadImages();
    }
  },
  computed: {
    itemFinalPrice() {
      return this.itemPrice * this.itemQuantity;
    },
  },

  methods: {
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
        console.log(this.itemComments[index]);
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
            if (this.itemComments[index].isLikedByUser == true) {
              this.itemComments[index].likes--;
              this.itemComments[index].isLikedByUser = false;
            }
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
            console.log("unlike is successful");
            this.itemComments[index].likes--;
            this.itemComments[index].isLikedByUser = false;
          }
        }, 400);
      }
    },
    async likeItem(index) {
      if (this.itemComments[index].isLikedByUser == false) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        console.log(this.itemComments[index]);
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
                isLike: true,
              }),
            }
          );

          if (!response.ok) {
            console.log("like not successful");
          } else {
            console.log("like is successful");
            this.itemComments[index].likes++;
            this.itemComments[index].isLikedByUser = true;
            if (this.itemComments[index].isDislikedByUser == true) {
              this.itemComments[index].dislikes--;
              this.itemComments[index].isDislikedByUser = false;
            }
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
      console.log("change picture running.");
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
};
</script>

<style scoped lang="scss">
@import "./ItemDetail.module.scss";
</style>
