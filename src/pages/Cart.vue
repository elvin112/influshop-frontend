<template>
  <header>
    <TheHeader />
  </header>
  <Transition>
    <ErrorMsg v-if="showErrMsg" :msg="errMsg" />
  </Transition>
  <Transition>
    <SimpleAlertMsg v-if="showAlertMsg" :msg="alertMsg" />
  </Transition>
  <div class="wrapper">
    <div class="process-form">
      <div class="path-indicator">
        <div
          class="path-indicator--1 path"
          :class="{ 'active-path': currentStage === 1 }"
          @click="moveToStage(1)"
        >
          <p class="path-indicator__num">1</p>
          <p
            class="path-indicator__title path-indicator__title--1"
            :class="{ 'active-title': currentStage === 1 }"
          >
            Delivery
          </p>
        </div>

        <div class="path-sep"></div>
        <div
          class="path-indicator--2 path"
          :class="{ 'active-path': currentStage === 2 }"
        >
          <p class="path-indicator__num">2</p>
          <p
            class="path-indicator__title"
            :class="{ 'active-title': currentStage === 2 }"
          >
            Payment
          </p>
        </div>
        <div class="path-sep"></div>
        <div
          class="path-indicator--3 path"
          :class="{ 'active-path': currentStage === 3 }"
        >
          <p class="path-indicator__num">3</p>
          <p
            class="path-indicator__title path-indicator__title--3"
            :class="{ 'active-title': currentStage === 3 }"
          >
            Confirmation
          </p>
        </div>
      </div>
      <hr class="mt-md" />

      <!-- DELIVERY INFORMATION -->
      <div
        v-show="cartLength <= 0 && currentStage !== 3"
        class="empty-graphic-container"
      >
        <span class="empty-graphic">
          <img src="../assets/img/SVG/16.-List-is-Empty.svg" alt="" />
        </span>
      </div>
      <div
        class="process-form__stage mt-sm"
        v-show="currentStage === 1 && cartLength > 0"
      >
        <p class="stage-title">Delivery Information</p>
        <div class="useSavedAddressChk">
          <p class="useSavedAddressChk__title">Use saved address</p>
          <input
            class="checkbox"
            type="checkbox"
            v-model="useSavedAddressChck"
          />
        </div>
        <div>
          <form @submit.prevent="submitAddressHandler">
            <select
              class="save-address-select"
              name=""
              id=""
              :disabled="!useSavedAddressChck"
              v-model="selectedSavedAdress"
              required
            >
              <option
                :key="address.id"
                v-for="(address, index) in userAddresses"
                :value="index"
              >
                {{ address.addressName }}
              </option>
            </select>
            <button
              v-show="useSavedAddressChck"
              :class="{ 'move-btn-down': useSavedAddressChck }"
              class="btn btn--primary form-control__submitAddress mt-sm"
            >
              Proceed to Payment
            </button>
          </form>
        </div>
        <form
          @submit.prevent="submitAddressHandler"
          class="stage-form mt-md"
          v-show="!useSavedAddressChck"
        >
          <div class="form-control">
            <label for="addName">Address Name</label>
            <input id="addName" type="text" v-model="addressName" required />
          </div>
          <div class="form-control">
            <label for="add">Address</label>
            <input
              id="add"
              type="text"
              placeholder="Enter your address"
              v-model="address"
              required
            />
          </div>
          <div class="form-control">
            <label for="country">Country</label>
            <input
              id="country"
              type="text"
              placeholder="Country of order"
              v-model="country"
              required
            />
          </div>
          <div class="form-control">
            <label for="state">State</label>
            <input
              id="state"
              type="text"
              placeholder="Enter state or region"
              v-model="state"
              required
            />
          </div>
          <div class="form-control">
            <label for="city">City</label>
            <input
              id="city"
              type="text"
              placeholder="City of order"
              v-model="city"
              required
            />
          </div>
          <div class="form-control">
            <label for="street">Street</label>
            <input
              id="street"
              type="text"
              placeholder="Enter your street"
              v-model="street"
              required
            />
          </div>
          <div class="form-control zip">
            <label for="zipcode">Zip code</label>
            <input
              id="zipcode"
              type="text"
              placeholder="00-000"
              v-model="zipcode"
              required
            />
          </div>
          <div class="save-check">
            <input
              id="saveAddress"
              type="checkbox"
              class="checkbox"
              v-model="addressCheckbox"
            />
            <label for="saveAddress">Save Address</label>
          </div>
          <button
            :class="{ 'move-btn-down': useSavedAddressChck }"
            class="btn btn--primary form-control__submitAddress mt-sm"
          >
            Proceed to Payment
          </button>
        </form>
      </div>

      <!-- PAYMENT INFORMATION -->
      <div class="process-form__stage mt-sm" v-show="currentStage === 2">
        <p class="stage-title">Payment Details</p>
        <div class="useSavedAddressChk">
          <p class="useSavedAddressChk__title">Use saved card</p>
          <input class="checkbox" type="checkbox" v-model="useSavedCardChck" />
        </div>
        <div>
          <form @submit.prevent="submitPaymentHandler">
            <select
              class="save-address-select"
              name=""
              id=""
              :disabled="!useSavedCardChck"
              v-model="selectedSavedCard"
              required
            >
              <option
                :key="address.id"
                v-for="(card, index) in userCreditCards"
                :value="index"
              >
                {{ card.creditCardName }}
              </option>
            </select>
            <button
              v-show="useSavedCardChck"
              :class="{ 'move-btn-down': useSavedCardChck }"
              class="btn btn--primary form-control__submitCard mt-sm"
            >
              Purchase Product
            </button>
          </form>
        </div>
        <form
          @submit.prevent="submitPaymentHandler"
          class="stage-form mt-md"
          v-show="!useSavedCardChck"
        >
          <div class="form-control">
            <label for="cdName">Card Name</label>
            <input
              id="cdName"
              type="text"
              placeholder=""
              v-model="cdName"
              minlength="1"
              required
            />
          </div>
          <div class="form-control">
            <label for="cdHolderName">Cardholder Name</label>
            <input
              id="cdHolderName"
              type="text"
              placeholder="Full Name"
              v-model="cdHolderName"
              minlength="6"
              required
            />
          </div>
          <div class="form-control">
            <label for="cdNumber">Card Number</label>
            <input
              id="cdNumber"
              type="text"
              onkeyup="this.value=this.value.replace(/[^\d]/,'')"
              placeholder="000000000000000"
              v-model="cdNumber"
              required
              minlength="16"
              maxlength="16"
            />
          </div>
          <div class="form-control">
            <label for="cdExpiration">Expiration</label>
            <input
              id="cdExpiration"
              type="text"
              placeholder="MM/YY"
              v-model="cdExpiration"
              minlength="5"
              maxlength="5"
              required
            />
          </div>
          <div class="form-control cvv">
            <label for="cdCvv">CVV</label>
            <input
              id="cdCvv"
              type="text"
              placeholder="123"
              v-model="cdCvv"
              required
              minlength="3"
              maxlength="3"
              onkeyup="this.value=this.value.replace(/[^\d]/,'')"
            />
          </div>
          <div class="save-check">
            <input
              id="saveCard"
              type="checkbox"
              class="checkbox"
              v-model="svCardChecbox"
            />
            <label for="saveCard">Save Card Details</label>
          </div>

          <button
            class="btn btn--primary form-control__submitCard mt-sm"
            :class="{ 'move-btn-down': useSavedCardChck }"
          >
            Purchase Product
          </button>
        </form>
      </div>

      <!-- Order Completion Information -->
      <div class="process-form__stage mt-sm" v-show="currentStage === 3">
        <div
          class="order-success-fail"
          v-show="paymentfailed && paymentfailed !== null"
        >
          <span class="reject-icon">
            <svg class="reject-icon">
              <use xlink:href="../assets/img/sprite.svg#icon-x-altx-alt" />
            </svg>
          </span>
          <p class="stage-title payment-fail">Ooops! Your order rejected</p>
          <div class="order-success-fail__buttons">
            <button
              @click="moveToStage(2)"
              class="btn btn--primary form-control__submitCard mt-sm"
            >
              Go to Payment
            </button>
            <button
              @click="continueShopping"
              class="btn btn--primary form-control__submitCard mt-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <div
          class="order-success-fail"
          v-show="!paymentfailed && paymentfailed !== null"
        >
          <span class="accepted-icon">
            <svg class="accepted-icon">
              <use xlink:href="../assets/img/sprite.svg#icon-check-alt" />
            </svg>
          </span>
          <p class="stage-title payment-success">
            Order Confirmed Successfully!
          </p>
          <div class="order-success-fail__buttons">
            <button
              @click="continueShopping"
              class="btn btn--primary form-control__submitCard mt-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="your-order">
      <p class="your-order__title">Your Order</p>
      <hr />
      <div class="cart-content-container">
        <div v-show="cartLength <= 0" class="cart-is-empty">
          <h2>Your cart is empty</h2>
          <p>
            To make an easy and quick purchase, add products to your shopping
            cart.
          </p>
        </div>

        <div class="cart-content mt-sm" v-for="item in userCart" :key="item.id">
          <div class="cart-content__item-img">
            <img
              :src="loadItemImg(item.image)"
              alt="An item."
              class="item__picture"
            />
          </div>
          <div class="cart-content__item-info">
            <div class="title-icon">
              <router-link :to="'/itemDetail/' + item.id"
                ><p>{{ item.itemName }}</p></router-link
              >

              <span
                class="delete-item"
                @click="removeItemFromCart(item.id, item.quantity)"
              >
                <svg class="delete-icon-bin">
                  <use xlink:href="../assets/img/sprite.svg#icon-bin" />
                </svg>
              </span>
            </div>
            <div class="quantityWprice">
              <div class="quantityWprice__quantity">
                <span
                  class="quantityWprice__quantity--1"
                  @click="decreaseItemQuantity(item.id, item.quantity)"
                  >-</span
                >
                <span>{{ item.quantity }}</span>
                <span
                  class="quantityWprice__quantity--3"
                  @click="increaseItemQuantity(item.id, item.quantity)"
                  >+</span
                >
              </div>

              <div class="quantityWprice__price">
                <p class="price-text">$89.99</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span class="cart-check">
        <hr />
        <span class="subtotal-shipping mb-sm mt-sm">
          <p class="subtotal-shipping__title">Subtotal</p>
          <p class="subtotal-shipping__number">$778.00</p>

          <p class="subtotal-shipping__title">Shipping</p>
          <p class="subtotal-shipping__number">$0.00</p>
        </span>
        <hr class="mt-md" />

        <span class="final-price mt-sm">
          <p class="final-price__title">Total</p>
          <p class="final-price__number">$778.00</p>
        </span>
      </span>
    </div>
  </div>
  <footer>
    <TheFooter />
  </footer>
</template>

<script>
import { isProxy, toRaw } from "vue";
import { Cloudinary } from "cloudinary-core"; // If your code is for ES6 or higher
var cl = new Cloudinary({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  secure: true,
});
export default {
  provide() {
    return {
      closeErrMsg: this.closeErrMsg,
      closeAlertMsg: this.closeAlertMsg,
    };
  },

  async mounted() {
    this.fetchUserAddresses();
    this.fetchUserCards();
  },
  computed: {
    userCart() {
      return this.$store.getters["cart/userCart"];
    },

    cartLength() {
      return this.$store.getters["cart/cartLength"];
    },
  },

  methods: {
    async increaseItemQuantity(id, quantity) {
      try {
        const response = await this.$store.dispatch("cart/increaseQuantity", {
          id: id,
          quantity: quantity,
        });

        if (!response.ok) {
          let errMsg = null;
          errMsg = await response.json();
          console.log(errMsg);
          throw errMsg;
        } else {
          //
        }
      } catch (error) {
        this.errMsg = "Item's quantity could not be changed!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
    },
    async decreaseItemQuantity(id, quantity) {
      if (quantity === 1) {
        return;
      }
      try {
        const response = await this.$store.dispatch("cart/decreaseQuantity", {
          id: id,
          quantity: quantity,
        });

        if (!response.ok) {
          let errMsg = null;
          errMsg = await response.json();
          console.log(errMsg);
          throw errMsg;
        } else {
          //
        }
      } catch (error) {
        this.errMsg = "Item's quantity could not be changed!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
    },
    async removeItemFromCart(id, quantity) {
      try {
        const response = await this.$store.dispatch("cart/removeItem", {
          id: id,
          quantity: quantity,
        });

        if (!response.ok) {
          let errMsg = null;
          errMsg = await response.json();
          console.log(errMsg);
          throw errMsg;
        } else {
          // alert("Item added!");
          this.alertMsg = "Item removed from the cart";
          this.showAlertMsg = true;
          setTimeout(() => {
            this.showAlertMsg = false;
          }, 5000);
        }
      } catch (error) {
        this.errMsg = "Item could not be removed!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
    },
    loadItemImg(imgLoc) {
      return cl.image(imgLoc).src;
    },
    async fetchUserCards() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/settings/credit-card`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.$store.getters["auth/token"], //accessToken contain bearer value.
            },
          }
        );
        if (!response.ok) {
          throw Error();
        } else {
          const data = await response.json();
          this.userCreditCards = data.creditCards;
        }
      } catch (error) {
        this.errMsg = "Credit cards could not be fetched!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
    },
    async fetchUserAddresses() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/settings/address`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.$store.getters["auth/token"], //accessToken contain bearer value.
            },
          }
        );
        if (!response.ok) {
          throw Error();
        } else {
          const data = await response.json();
          this.userAddresses = data.addresses;
        }
      } catch (error) {
        this.errMsg = "Address could not be fetched!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
    },
    continueShopping() {
      this.$router.push("/");
    },
    closeErrMsg() {
      this.showErrMsg = false;
    },
    closeAlertMsg() {
      this.showAlertMsg = false;
    },
    async submitPaymentHandler() {
      let checkoutUrl = "";
      const payload = {
        creditCardName: this.cdName,
        cardNumber: this.cdNumber,
        cardHolderName: this.cdHolderName,
        expirationDate: this.cdExpiration,
        cvv: this.cdCvv,
      };
      let addressData = null;
      if (this.useSavedAddressChck) {
        const tempAddressData = this.userAddresses[this.selectedSavedAdress];
        addressData = {
          addressName: tempAddressData.addressName,
          address: tempAddressData.address,
          country: tempAddressData.country,
          state: tempAddressData.state,
          city: tempAddressData.city,
          street: tempAddressData.street,
          zip: tempAddressData.zip,
        };
      } else {
        addressData = {
          addressName: this.addressName,
          address: this.address,
          country: this.country,
          state: this.state,
          city: this.city,
          street: this.street,
          zip: this.zipcode,
        };
      }
      if (this.useSavedCardChck) {
        // send checkout request with saved credit-card
        const payload = {
          creditCardId: this.userCreditCards[this.selectedSavedCard].id,
          shippingAddress: addressData,
        };

        try {
          const response = await fetch(
            `http://localhost:8080/api/v1/e-commerce/checkout-with-saved-credit-card`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.$store.getters["auth/token"], //accessToken contain bearer value.
              },
              body: JSON.stringify(payload),
            }
          );
          if (!response.ok) {
            throw Error();
          } else {
            const data = await response.json();
            this.paymentfailed = false;
            this.$store.dispatch("cart/fetchUserCart");
            this.moveToStage(3);
          }
        } catch (error) {
          this.paymentfailed = true;
          this.moveToStage(3);
        }
      } else if (this.svCardChecbox) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/v1/settings/credit-card`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.$store.getters["auth/token"], //accessToken contain bearer value.
              },
              body: JSON.stringify(payload),
            }
          );
          if (!response.ok) {
            const data = response.json();

            throw Error();
          } else {
            const data = await response.json();

            // send checkout request with saved credit-card
            const payload = {
              creditCardId: data.creditCardId,
              shippingAddress: addressData,
            };
            try {
              const response = await fetch(
                `http://localhost:8080/api/v1/e-commerce/checkout-with-saved-credit-card`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization:
                      "Bearer " + this.$store.getters["auth/token"], //accessToken contain bearer value.
                  },
                  body: JSON.stringify(payload),
                }
              );
              if (!response.ok) {
                throw Error();
              } else {
                const data = await response.json();
                this.paymentfailed = false;
                this.$store.dispatch("cart/fetchUserCart");
                this.moveToStage(3);
              }
            } catch (error) {
              this.paymentfailed = true;
              this.moveToStage(3);
            }
          }
        } catch (error) {
          this.errMsg = "Card could not be saved!";
          this.showErrMsg = true;
          // this.moveToStage(2);
          setTimeout(() => {
            this.showErrMsg = false;
          }, 5000);
        }
      } else {
        // send checkout request without saving card
        const payload = {
          shippingAddress: addressData,
          creditCard: {
            cardNumber: this.cdNumber,
            cardHolderName: this.cdHolderName,
            expirationDate: this.cdExpiration,
            cvv: this.cdCvv,
          },
        };

        try {
          const response = await fetch(
            `http://localhost:8080/api/v1/e-commerce/checkout`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.$store.getters["auth/token"], //accessToken contain bearer value.
              },
              body: JSON.stringify(payload),
            }
          );
          if (!response.ok) {
            console.log(await response.json());
            throw Error();
          } else {
            this.paymentfailed = false;
            this.$store.dispatch("cart/fetchUserCart");
            this.moveToStage(3);
          }
        } catch (error) {
          this.paymentfailed = true;
          this.moveToStage(3);
        }
      }
    },
    async submitAddressHandler() {
      const payload = {
        addressName: this.addressName,
        address: this.address,
        country: this.country,
        state: this.state,
        city: this.city,
        street: this.street,
        zip: this.zipcode,
      };
      if (!this.addressCheckbox) {
        this.moveToStage(2);
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/settings/address`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.$store.getters["auth/token"], //accessToken contain bearer value.
            },
            body: JSON.stringify(payload),
          }
        );
        if (!response.ok) {
          throw Error();
        } else {
          this.moveToStage(2);
        }
      } catch (error) {
        this.errMsg = "Address could not be saved!";
        this.showErrMsg = true;
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
    },
    moveToStage(stageNum) {
      switch (stageNum) {
        case 1:
          if (this.addressCheckbox) {
            this.fetchUserAddresses();
            this.selectedSavedAdress = this.userAddresses.length;
            this.useSavedAddressChck = true;
            this.addressCheckbox = false;
          }
          this.currentStage = 1;
          break;
        case 2:
          if (this.svCardChecbox) {
            this.fetchUserCards();
            this.selectedSavedCard = this.userCreditCards.length;
            this.useSavedCardChck = true;
            this.svCardChecbox = false;
          }
          this.currentStage = 2;
          break;
        case 3:
          this.currentStage = 3;
          break;
      }
    },
  },
  data() {
    return {
      alertMsg: "Process done!",
      showAlertMsg: false,
      errMsg: "Something went wrong!",
      showErrMsg: false,
      currentStage: 1,
      addressName: "",
      address: "",
      country: "",
      state: "",
      city: "",
      street: "",
      zipcode: "",
      addressCheckbox: "",
      cdName: "",
      cdHolderName: "",
      cdNumber: "",
      cdExpiration: "",
      cdCvv: "",
      svCardChecbox: "",
      paymentfailed: null,
      useSavedAddressChck: false,
      useSavedCardChck: false,
      userAddresses: [],
      userCreditCards: [],
      selectedSavedAdress: "0",
      selectedSavedCard: "0",
    };
  },
};
</script>

<style scoped lang="scss">
@import "./Cart.module.scss";
</style>
