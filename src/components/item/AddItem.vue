<template>
  <BaseCard>
    <div class="wrapper-add-item">
      <h2 class="title">Adding New Item</h2>

      <form action="" class="add-item-form" @submit.prevent="submitHandler">
        <div class="add-item-form__form-control">
          <label for="item-name">Name:</label>
          <input
            required
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
            cols="52"
            type="text"
            id="item-description"
            v-model="itemDescription"
            class="form-input--primary"
          ></textarea>
        </div>

        <div class="add-item-form__form-control">
          <label for="item-price">Price:</label>
          <input
            required
            type="text"
            id="item-price"
            v-model="itemPrice"
            class="form-input--primary"
          />
        </div>

        <div class="add-item-form__form-control">
          <label for="item-quantity">Quantity:</label>
          <input
            required
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
            required
            type="radio"
            id="pin-item"
            name="pin-this-item"
            v-model="isPinned"
            value="yes"
            class="form-input--primary radio-item"
          />

          <label for="dont-pin-item">No</label>
          <input
            required
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

        <div class="add-item-form__form-control">
          <p>Has extra features?</p>
          <label for="h-extra-features">Yes</label>
          <input
            type="radio"
            id="h-extra-features"
            name="extra-feature"
            v-model="hasExtraFeature"
            value="yes"
            class="form-input--primary radio-item"
          />

          <label for="n-extra-features">No</label>
          <input
            type="radio"
            id="n-extra-features"
            name="extra-feature"
            v-model="hasExtraFeature"
            value="no"
            class="form-input--primary radio-item"
          />
        </div>
        <hr v-if="hasExtraFeature === 'yes'" />
        <div
          v-if="hasExtraFeature === 'yes'"
          class="add-item-form__form-control extra-feature-container"
        >
          <div class="extra-feature-container__group-selection">
            <p>Select item group:</p>
            <select
              name=""
              id=""
              class="form-input--primary"
              v-model="selectedItemGroup"
            >
              <option :key="groupName" v-for="groupName in itemGroups">
                {{ groupName }}
              </option>
              <option>+ Adding to New Item Group</option>
            </select>
          </div>
          <div
            v-if="isCreatingGroup"
            class="add-item-form__form-control full-width"
          >
            <label for="new-group-name">Group name:</label>
            <input
              required
              type="text"
              id="group-name"
              v-model="newItemGroupName"
              class="form-input--primary"
            />
          </div>

          <div class="property-content-container">
            <br />
            <div class="property">
              <label for="property-name">Property:</label>
              <input
                required
                type="text"
                id="property-name"
                placeholder="e.g., color, size"
                class="form-input--primary mb-sm property-name"
              />
            </div>
            <div class="content">
              <label for="content-name">Content:</label>
              <input
                required
                type="text"
                id="content-name"
                class="form-input--primary mb-sm content__first-content content-name"
                placeholder="e.g., red, blue, green"
              />
            </div>
            <button
              type="button"
              class="btn btn--tertiary"
              @click="addPropContentField"
            >
              <svg class="input-icon-plus-circle">
                <use
                  xlink:href="../../assets/img/sprite.svg#icon-plus-circle"
                />
              </svg>
              Add field
            </button>
          </div>

          <div
            class="extra-prop-content-field mb-sm"
            ref="extra-prop-content-field"
          ></div>
          <div class="extra-feature-container__img file-placeholder">
            <div class="image-uploader">
              <label for="file-input-6" ref="fileLabel6">
                Upload item group image
                <input
                  id="file-input-6"
                  type="file"
                  @change="preview($event, 'frame-6')"
                />
              </label>

              <img ref="frame6" src="" alt="" class="image-uploader__preview" />
              <span
                class="image-uploader__delete-item"
                @click="deleteImg('image-6')"
              >
                <svg class="input-icon-bin">
                  <use xlink:href="../../assets/img/sprite.svg#icon-bin" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <hr v-if="hasExtraFeature === 'yes'" />

        <div class="form-button-control">
          <button class="btn btn--success" type="submit">Save</button>
          <button class="btn btn--cancel">Cancel</button>
        </div>
      </form>
    </div>
  </BaseCard>
</template>

<script>
export default {
  watch: {
    isPinned(value) {
      if (value === "no") {
        this.isPinnedFormatted = false;
      } else {
        this.isPinnedFormatted = true;
      }
    },
    async hasExtraFeature(value) {
      this.itemGroups = [];
      if (value === "no") {
        return;
      }
      try {
        const fetchedItemGroups = await this.fetchItemGroups();
        fetchedItemGroups.forEach((itemGroup) => {
          this.itemGroups.push(itemGroup.itemGroupName);
        });
      } catch (error) {
        console.log("Couldn't fetch item groups");
      }
    },
    selectedItemGroup(value) {
      if (value === "+ Adding to New Item Group") {
        this.isCreatingGroup = true;
        return;
      } else {
        this.isCreatingGroup = false;
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
      hasExtraFeature: "no",
      hasExtraFeatureFormatted: false,
      selectedItemGroup: null,
      itemGroups: [],
      itemGroupImage: null,
      isCreatingGroup: false,
      newItemGroupName: "",
      propertyWContents: null,
    };
  },
  methods: {
    async extraFeatureAPIHandler() {
      if (this.isCreatingGroup) {
        try {
          const response = await this.createItemGroup();

          if (response && response.ok) {
            // sending post request for item creation with extra features
            let itemImages = [];

            for (let index = 0; index < this.images.length; index++) {
              const element = {
                image: this.images[index],
                order: (index + 1).toString(),
              };
              itemImages.push(element);
            }

            const payloadForNewItemWExtra = {
              itemName: this.itemName,
              itemGroupName: this.newItemGroupName,
              itemDescription: this.itemDescription,
              itemPrice: this.itemPrice,
              itemQuantity: this.itemQuantity,
              extraFeatures: this.propertyWContents,
              isPinned: this.isPinnedFormatted,
              itemImages: itemImages,
            };

            const response = await fetch(
              `http://localhost:8080/api/v1/item-ops/item/extra`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + this.$store.getters["auth/token"], //accessToken contain bearer value.
                },
                body: JSON.stringify(payloadForNewItemWExtra),
              }
            );

            if (response.ok) {
              alert("Item with extra feature added!");
            }
          }
        } catch (error) {
          throw Error(error);
        }
      } else {
        // todo
      }
    },
    async createItemGroup() {
      const propertyNodes = document.getElementsByClassName("property-name");
      const contentNodes = document.getElementsByClassName("content-name");

      this.propertyWContents = {};
      let tempExtraFeatures = [];
      for (let index = 0; index < propertyNodes.length; index++) {
        const key = propertyNodes[index].value;
        const value = contentNodes[index].value;
        const contFormattedVal = value.split(",");
        this.propertyWContents[key] = contFormattedVal;
        tempExtraFeatures.push(key);
      }

      const payloadForNewGroup = {
        itemGroupName: this.newItemGroupName,
        extraFeatures: tempExtraFeatures,
        itemGroupImage: this.itemGroupImage,
      };

      // todo: sending post request for item group creation:

      const response = await fetch(
        `http://localhost:8080/api/v1/item-ops/item-group`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.getters["auth/token"], //accessToken contain bearer value.
          },
          body: JSON.stringify(payloadForNewGroup),
        }
      );

      return response;
    },

    async fetchItemGroups() {
      const response = await fetch(
        `http://localhost:8080/api/v1/item-ops/item-groups`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.$store.getters["auth/token"],
          },
        }
      );
      if (!response.ok) {
        throw Error("Failed to fetch item groups!");
      } else {
        const data = await response.json();
        return data.itemGroups;
      }
    },
    async submitHandler() {
      if (this.hasExtraFeature === "yes") {
        try {
          this.extraFeatureAPIHandler();
          return;
        } catch (error) {
          console.log(error);
          return;
        }
      } else {
        let itemImages = [];

        for (let index = 0; index < this.images.length; index++) {
          const element = {
            image: this.images[index],
            order: (index + 1).toString(),
          };
          itemImages.push(element);
        }
        try {
          const response = await fetch(
            `http://localhost:8080/api/v1/item-ops/item`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.$store.getters["auth/token"], //accessToken contain bearer value.
              },
              body: JSON.stringify({
                itemName: this.itemName,
                itemDescription: this.itemDescription,
                itemPrice: this.itemPrice,
                itemQuantity: this.itemQuantity,
                isPinned: this.isPinnedFormatted,
                itemImages: itemImages,
              }),
            }
          );

          if (!response.ok) {
            throw Error("Internal server error");
          } else {
            alert("Item added!");
          }
        } catch (error) {
          this.errorMsg = error.message;
        }
      }
    },

    preview(event, msg) {
      let file;
      let reader;
      switch (msg) {
        case "frame-1":
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
          };

          break;
        case "frame-6":
          const frame6 = this.$refs.frame6;
          const fileLabel6 = this.$refs.fileLabel6;
          frame6.src = URL.createObjectURL(event.target.files[0]);
          frame6.style.display = "inline-block";
          fileLabel6.style.display = "none";

          file = event.target.files[0];
          reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            this.itemGroupImage = reader.result;
            frame6.src = reader.result;
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

          break;
        case "image-2":
          const frame2 = this.$refs.frame2;
          const fileLabel2 = this.$refs.fileLabel2;
          this.images = this.images.filter((file) => file !== frame2.src);

          frame2.src = "";
          frame2.style.display = "none";
          fileLabel2.style.display = "inline-block";
          break;
        case "image-3":
          const frame3 = this.$refs.frame3;
          const fileLabel3 = this.$refs.fileLabel3;
          this.images = this.images.filter((file) => file !== frame3.src);

          frame3.src = "";
          frame3.style.display = "none";
          fileLabel3.style.display = "inline-block";
          break;
        case "image-4":
          const frame4 = this.$refs.frame4;
          const fileLabel4 = this.$refs.fileLabel4;
          this.images = this.images.filter((file) => file !== frame4.src);

          frame4.src = "";
          frame4.style.display = "none";
          fileLabel4.style.display = "inline-block";

          break;
        case "image-5":
          const frame5 = this.$refs.frame5;
          const fileLabel5 = this.$refs.fileLabel5;
          this.images = this.images.filter((file) => file !== frame5.src);

          frame5.src = "";
          frame5.style.display = "none";
          fileLabel5.style.display = "inline-block";
          break;
        case "image-6":
          const frame6 = this.$refs.frame6;
          const fileLabel6 = this.$refs.fileLabel6;
          this.images = this.images.filter((file) => file !== frame6.src);

          frame6.src = "";
          frame6.style.display = "none";
          fileLabel6.style.display = "inline-block";
          break;
        default:
          console.log(`Sorry, we are out of ${expr}.`);
      }
    },

    addPropContentField() {
      const propertyInput = `<div class="prop-cont-extra-container"><div class="mb-sm"><input
        required
        type="text"
        id="property-name"
        placeholder="e.g., color, size"
        class="form-input--primary property-name"
      /></div><div class="mb-sm"><input
                required
                type="text"
                id="content-name"

                class="form-input--primary content-name"
                placeholder="e.g., red, blue, green "/>
                <span class="prop-content__remove-icon" onclick="myFunction(this.parentElement)">
                  <svg class="input-icon-bin">
                    <use xlink:href="/src/assets/img/sprite.svg#icon-bin" />
                  </svg>
                </span>
              </div></div>`;

      // const contentInput = `
      //         `;
      this.$refs["extra-prop-content-field"].insertAdjacentHTML(
        "beforeend",
        propertyInput
      );
      // this.$refs["extra-prop-content-field"].insertAdjacentHTML(
      //   "beforeend",
      //   contentInput
      // );
    },
  },
};
</script>

<style scoped lang="scss">
@import "./AddItem.module.scss";
</style>
