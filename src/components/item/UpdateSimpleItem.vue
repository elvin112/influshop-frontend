<template>
  <BaseCard>
    <div class="wrapper-add-item">
      <h2 class="title">Updating Flat Item</h2>

      <form action="" class="add-item-form" @submit.prevent="submitHandler">
        <div class="add-item-form__form-control">
          <label for="item-name">Name:</label>
          <input
            type="text"
            id="item-name"
            v-model="itemName"
            class="form-input--primary"
          />
        </div>
        <div class="add-item-form__form-control">
          <label for="item-description">Description:</label>
          <textarea
            rows="5"
            cols="12"
            type="text"
            id="item-description"
            v-model="itemDescription"
            class="form-input--primary"
          ></textarea>
        </div>

        <div class="add-item-form__form-control">
          <label for="item-price">Price:</label>
          <input
            type="text"
            id="item-price"
            v-model="itemPrice"
            class="form-input--primary"
          />
        </div>

        <div class="add-item-form__form-control">
          <label for="item-quantity">Quantity:</label>
          <input
            type="number"
            id="item-quantity"
            v-model="itemQuantity"
            class="form-input--primary"
          />
        </div>
        <div class="add-item-form__form-control">
          <p>Pin this item?</p>
          <label for="pin-item">Yes</label>
          <input
            type="radio"
            id="pin-item"
            name="pin-this-item"
            v-model="isPinned"
            value="yes"
            class="form-input--primary radio-item"
          />

          <label for="dont-pin-item">No</label>
          <input
            type="radio"
            id="dont-pin-item"
            name="pin-this-item"
            v-model="isPinned"
            value="no"
            class="form-input--primary radio-item"
          />
        </div>

        <div class="add-item-form__form-control file-placeholder">
          <div class="image-uploader">
            <label for="file-input-1" ref="fileLabel1">
              Upload item image
              <input
                id="file-input-1"
                type="file"
                @change="preview($event, 'frame-1')"
              />
            </label>

            <img ref="frame1" src="" alt="" class="image-uploader__preview" />
            <span
              class="image-uploader__delete-item"
              @click="deleteImg('image-1')"
            >
              <svg class="input-icon-bin">
                <use xlink:href="../../assets/img/sprite.svg#icon-bin" />
              </svg>
            </span>
          </div>

          <div class="image-uploader">
            <label for="file-input-2" ref="fileLabel2">
              Upload item image
              <input
                id="file-input-2"
                type="file"
                @change="preview($event, 'frame-2')"
              />
            </label>

            <img ref="frame2" src="" alt="" class="image-uploader__preview" />
            <span
              class="image-uploader__delete-item"
              @click="deleteImg('image-2')"
            >
              <svg class="input-icon-bin">
                <use xlink:href="../../assets/img/sprite.svg#icon-bin" />
              </svg>
            </span>
          </div>

          <div class="image-uploader">
            <label for="file-input-3" ref="fileLabel3">
              Upload item image
              <input
                id="file-input-3"
                type="file"
                @change="preview($event, 'frame-3')"
              />
            </label>

            <img ref="frame3" src="" alt="" class="image-uploader__preview" />
            <span
              class="image-uploader__delete-item"
              @click="deleteImg('image-3')"
            >
              <svg class="input-icon-bin">
                <use xlink:href="../../assets/img/sprite.svg#icon-bin" />
              </svg>
            </span>
          </div>

          <div class="image-uploader">
            <label for="file-input-4" ref="fileLabel4">
              Upload item image
              <input
                id="file-input-4"
                type="file"
                @change="preview($event, 'frame-4')"
              />
            </label>

            <img ref="frame4" src="" alt="" class="image-uploader__preview" />
            <span
              class="image-uploader__delete-item"
              @click="deleteImg('image-4')"
            >
              <svg class="input-icon-bin">
                <use xlink:href="../../assets/img/sprite.svg#icon-bin" />
              </svg>
            </span>
          </div>

          <div class="image-uploader">
            <label for="file-input-5" ref="fileLabel5">
              Upload item image
              <input
                id="file-input-5"
                type="file"
                @change="preview($event, 'frame-5')"
              />
            </label>

            <img ref="frame5" src="" alt="" class="image-uploader__preview" />
            <span
              class="image-uploader__delete-item"
              @click="deleteImg('image-5')"
            >
              <svg class="input-icon-bin">
                <use xlink:href="../../assets/img/sprite.svg#icon-bin" />
              </svg>
            </span>
          </div>
        </div>

        <div class="form-button-control">
          <button class="btn btn--success" type="submit">Save</button>
          <button
            class="btn btn--cancel"
            @click="closeUpdateFlatItemPopup('cancel')"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </BaseCard>
</template>

<script>
import { isProxy, toRaw } from "vue";
import { Cloudinary } from "cloudinary-core"; // If your code is for ES6 or higher
var cl = new Cloudinary({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  secure: true,
});
export default {
  props: ["itemToUpdate"],
  inject: ["closeUpdateFlatItemPopup"],
  mounted() {
    this.itemName = this.itemToUpdate.name;
    this.itemDescription = this.itemToUpdate.description;
    this.itemPrice = this.itemToUpdate.price;
    console.log(this.itemToUpdate);
    this.itemQuantity = this.itemToUpdate.quantity;
    this.isPinned = this.itemToUpdate.isPinned ? "yes" : "no";
    this.itemId = this.itemToUpdate.id;
    this.fetchItemImages();
  },
  watch: {
    isPinned(value) {
      if (value === "no") {
        this.isPinnedFormatted = false;
      } else {
        this.isPinnedFormatted = true;
      }
    },
  },
  data() {
    return {
      isPinnedFormatted: false,
      images: [],
      itemName: "",
      itemDescription: "",
      itemPrice: "",
      itemQuantity: "",
      isPinned: "no",
      isInternalError: false,
      errorMsg: "",
      itemId: null,
      itemImages: [],
      image1Loaded: false,
      image2Loaded: false,
      image3Loaded: false,
      image4Loaded: false,
      image5Loaded: false,
    };
  },
  methods: {
    async submitHandler() {
      let tempImages = [];
      for (let image of this.itemImages) {
        const rawObjectOrArray = toRaw(image);
        tempImages.push(rawObjectOrArray);
      }

      const payload = {
        itemId: this.itemId,
        isPinned: this.isPinnedFormatted,
        itemImages: tempImages,
        itemName: this.itemName,
        itemDescription: this.itemDescription,
        itemPrice: this.itemPrice,
        itemQuantity: this.itemQuantity,
      };

      console.log(payload);
      const response = await fetch(
        `http://localhost:8080/api/v1/item-ops/item`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.getters["auth/token"], //accessToken contain bearer value.
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        // alert("Something went wrong!");
        this.closeUpdateFlatItemPopup(false);
      } else {
        // alert("Item updated!");
        this.closeUpdateFlatItemPopup(true);
      }
    },
    async fetchItemImages() {
      const response = await fetch(
        `http://localhost:8080/api/v1/item-ops/item/${this.itemId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          alert("Item not found!");
          return;
        }
        // throw Error("Internal server error");
      } else {
        const data = await response.json();
        const tempImages = data.item.images;

        for (let elem of tempImages) {
          this.itemImages.push({
            image: elem.imageLocation,
            order: elem.imageOrder + "",
            isNew: false,
          });
          switch (elem.imageOrder + "") {
            case "1":
              const frame1 = this.$refs.frame1;
              const fileLabel1 = this.$refs.fileLabel1;
              // frame1.src = URL.createObjectURL(event.target.files[0]);
              frame1.style.display = "inline-block";
              fileLabel1.style.display = "none";
              frame1.src = cl.image(elem.imageLocation).src;
              this.image1Loaded = true;
              break;
            case "2":
              const frame2 = this.$refs.frame2;
              const fileLabel2 = this.$refs.fileLabel2;
              // frame2.src = URL.createObjectURL(event.target.files[0]);
              frame2.style.display = "inline-block";
              fileLabel2.style.display = "none";
              frame2.src = cl.image(elem.imageLocation).src;
              this.image2Loaded = true;

              break;
            case "3":
              const frame3 = this.$refs.frame3;
              const fileLabel3 = this.$refs.fileLabel3;
              // frame3.src = URL.createObjectURL(event.target.files[0]);
              frame3.style.display = "inline-block";
              fileLabel3.style.display = "none";
              frame3.src = cl.image(elem.imageLocation).src;
              this.image3Loaded = true;

              break;
            case "4":
              const frame4 = this.$refs.frame4;
              const fileLabel4 = this.$refs.fileLabel4;
              // frame4.src = URL.createObjectURL(event.target.files[0]);
              frame4.style.display = "inline-block";
              fileLabel4.style.display = "none";
              frame4.src = cl.image(elem.imageLocation).src;
              this.image4Loaded = true;

              break;
            case "5":
              const frame5 = this.$refs.frame5;
              const fileLabel5 = this.$refs.fileLabel5;
              // frame5.src = URL.createObjectURL(event.target.files[0]);
              frame5.style.display = "inline-block";
              fileLabel5.style.display = "none";
              frame5.src = cl.image(elem.imageLocation).src;
              this.image5Loaded = true;

              break;

            default:
              console.log(`Sorry, we are out of ${expr}.`);
          }
        }
      }
    },
    preview(event, msg) {
      let file;
      let reader;
      switch (msg) {
        case "frame-1":
          // this.itemImages.push({
          //     image: elem.imageLocation,
          //     order: elem.imageOrder + "",
          //     isNew: false,
          //   });
          const frame1 = this.$refs.frame1;
          const fileLabel1 = this.$refs.fileLabel1;
          // frame1.src = URL.createObjectURL(event.target.files[0]);
          frame1.style.display = "inline-block";
          fileLabel1.style.display = "none";

          file = event.target.files[0];
          reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            this.images.push(reader.result);
            frame1.src = reader.result;
            if (!this.image1Loaded) {
              this.itemImages.push({
                image: reader.result,
                order: "1",
                isNew: true,
              });
              this.image1Loaded = true;
            } else {
              for (let index = 0; index < this.itemImages.length; index++) {
                const element = this.itemImages[index];
                if (element.order === "1") {
                  this.itemImages[index].image = reader.result;
                  this.itemImages[index].isNew = true;
                }
                return;
              }
            }
          };

          break;
        case "frame-2":
          const frame2 = this.$refs.frame2;
          const fileLabel2 = this.$refs.fileLabel2;
          frame2.src = URL.createObjectURL(event.target.files[0]);
          frame2.style.display = "inline-block";
          fileLabel2.style.display = "none";

          file = event.target.files[0];
          reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            this.images.push(reader.result);
            frame2.src = reader.result;
            if (!this.image2Loaded) {
              this.itemImages.push({
                image: reader.result,
                order: "2",
                isNew: true,
              });
              this.image2Loaded = true;
            } else {
              for (let index = 0; index < this.itemImages.length; index++) {
                const element = this.itemImages[index];
                if (element.order === "2") {
                  this.itemImages[index].image = reader.result;
                  this.itemImages[index].isNew = true;
                }
                return;
              }
            }
          };

          break;
        case "frame-3":
          const frame3 = this.$refs.frame3;
          const fileLabel3 = this.$refs.fileLabel3;
          frame3.src = URL.createObjectURL(event.target.files[0]);
          frame3.style.display = "inline-block";
          fileLabel3.style.display = "none";

          file = event.target.files[0];
          reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            this.images.push(reader.result);
            frame3.src = reader.result;
            if (!this.image3Loaded) {
              this.itemImages.push({
                image: reader.result,
                order: "3",
                isNew: true,
              });
              this.image3Loaded = true;
            } else {
              for (let index = 0; index < this.itemImages.length; index++) {
                const element = this.itemImages[index];
                if (element.order === "3") {
                  this.itemImages[index].image = reader.result;
                  this.itemImages[index].isNew = true;
                }
                return;
              }
            }
          };

          break;
        case "frame-4":
          const frame4 = this.$refs.frame4;
          const fileLabel4 = this.$refs.fileLabel4;
          frame4.src = URL.createObjectURL(event.target.files[0]);
          frame4.style.display = "inline-block";
          fileLabel4.style.display = "none";

          file = event.target.files[0];
          reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            this.images.push(reader.result);
            frame4.src = reader.result;
            if (!this.image4Loaded) {
              this.itemImages.push({
                image: reader.result,
                order: "4",
                isNew: true,
              });
              this.image4Loaded = true;
            } else {
              for (let index = 0; index < this.itemImages.length; index++) {
                const element = this.itemImages[index];
                if (element.order === "4") {
                  this.itemImages[index].image = reader.result;
                  this.itemImages[index].isNew = true;
                }
                return;
              }
            }
          };

          break;
        case "frame-5":
          const frame5 = this.$refs.frame5;
          const fileLabel5 = this.$refs.fileLabel5;
          frame5.src = URL.createObjectURL(event.target.files[0]);
          frame5.style.display = "inline-block";
          fileLabel5.style.display = "none";

          file = event.target.files[0];
          reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            this.images.push(reader.result);
            frame5.src = reader.result;
            if (!this.image5Loaded) {
              this.itemImages.push({
                image: reader.result,
                order: "5",
                isNew: true,
              });
              this.image5Loaded = true;
            } else {
              for (let index = 0; index < this.itemImages.length; index++) {
                const element = this.itemImages[index];
                if (element.order === "5") {
                  this.itemImages[index].image = reader.result;
                  this.itemImages[index].isNew = true;
                }
                return;
              }
            }
          };

          break;

        default:
          console.log(`Sorry, we are out of ${expr}.`);
      }
    },
    deleteImg(img) {
      switch (img) {
        case "image-1":
          const frame1 = this.$refs.frame1;
          const fileLabel1 = this.$refs.fileLabel1;
          this.images = this.images.filter((file) => file !== frame1.src);

          frame1.src = "";
          frame1.style.display = "none";
          fileLabel1.style.display = "inline-block";

          for (let index = 0; index < this.itemImages.length; index++) {
            const element = this.itemImages[index];
            if (element.order === "1") {
              this.itemImages = this.itemImages.filter(
                (elem) => elem.order !== "1"
              );
            }
            this.image1Loaded = false;
          }

          break;
        case "image-2":
          const frame2 = this.$refs.frame2;
          const fileLabel2 = this.$refs.fileLabel2;
          this.images = this.images.filter((file) => file !== frame2.src);

          frame2.src = "";
          frame2.style.display = "none";
          fileLabel2.style.display = "inline-block";

          for (let index = 0; index < this.itemImages.length; index++) {
            const element = this.itemImages[index];
            if (element.order === "2") {
              this.itemImages = this.itemImages.filter(
                (elem) => elem.order !== "2"
              );
            }
            this.image2Loaded = false;
          }
          break;
        case "image-3":
          const frame3 = this.$refs.frame3;
          const fileLabel3 = this.$refs.fileLabel3;
          this.images = this.images.filter((file) => file !== frame3.src);

          frame3.src = "";
          frame3.style.display = "none";
          fileLabel3.style.display = "inline-block";

          for (let index = 0; index < this.itemImages.length; index++) {
            const element = this.itemImages[index];
            if (element.order === "3") {
              this.itemImages = this.itemImages.filter(
                (elem) => elem.order !== "3"
              );
            }
            this.image3Loaded = false;
          }
          break;
        case "image-4":
          const frame4 = this.$refs.frame4;
          const fileLabel4 = this.$refs.fileLabel4;
          this.images = this.images.filter((file) => file !== frame4.src);

          frame4.src = "";
          frame4.style.display = "none";
          fileLabel4.style.display = "inline-block";

          for (let index = 0; index < this.itemImages.length; index++) {
            const element = this.itemImages[index];
            if (element.order === "4") {
              this.itemImages = this.itemImages.filter(
                (elem) => elem.order !== "4"
              );
            }
            this.image4Loaded = false;
          }

          break;
        case "image-5":
          const frame5 = this.$refs.frame5;
          const fileLabel5 = this.$refs.fileLabel5;
          this.images = this.images.filter((file) => file !== frame5.src);

          frame5.src = "";
          frame5.style.display = "none";
          fileLabel5.style.display = "inline-block";

          for (let index = 0; index < this.itemImages.length; index++) {
            const element = this.itemImages[index];
            if (element.order === "5") {
              this.itemImages = this.itemImages.filter(
                (elem) => elem.order !== "5"
              );
            }
            this.image5Loaded = false;
          }
          break;

        default:
          console.log(`Sorry, we are out of ${expr}.`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "./UpdateFlatItem.module.scss";
</style>
