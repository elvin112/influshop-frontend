<template>
  <header>
    <TheHeader />
  </header>
  <Transition v-if="showErrMsg">
    <ErrorMsg :msg="errMsg" />
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
      <div class="process-form__stage mt-sm" v-show="currentStage === 1">
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
        <form @submit.prevent="submitPaymentHandler" class="stage-form mt-md">
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

          <button class="btn btn--primary form-control__submitCard mt-sm">
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
        <div class="cart-content mt-sm">
          <div class="cart-content__item-img">
            <img src="../assets/img/no-img-placeholder.jpeg" alt="" />
          </div>
          <div class="cart-content__item-info">
            <div class="title-icon">
              <p>Adidas Shoes</p>

              <span class="delete-item">
                <svg class="delete-icon-bin">
                  <use xlink:href="../assets/img/sprite.svg#icon-bin" />
                </svg>
              </span>
            </div>
            <div class="quantityWprice">
              <div class="quantityWprice__quantity">
                <span
                  class="quantityWprice__quantity--1"
                  @click="
                    {
                    }
                  "
                  >-</span
                >
                <span>1</span>
                <span
                  class="quantityWprice__quantity--3"
                  @click="
                    {
                    }
                  "
                  >+</span
                >
              </div>

              <div class="quantityWprice__price">
                <p class="price-text">$89.99</p>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-content mt-sm">
          <div class="cart-content__item-img">
            <img src="../assets/img/no-img-placeholder.jpeg" alt="" />
          </div>
          <div class="cart-content__item-info">
            <div class="title-icon">
              <p>Adidas Shoes</p>

              <span class="delete-item">
                <svg class="delete-icon-bin">
                  <use xlink:href="../assets/img/sprite.svg#icon-bin" />
                </svg>
              </span>
            </div>
            <div class="quantityWprice">
              <div class="quantityWprice__quantity">
                <span
                  class="quantityWprice__quantity--1"
                  @click="
                    {
                    }
                  "
                  >-</span
                >
                <span>1</span>
                <span
                  class="quantityWprice__quantity--3"
                  @click="
                    {
                    }
                  "
                  >+</span
                >
              </div>

              <div class="quantityWprice__price">
                <p class="price-text">$89.99</p>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-content mt-sm">
          <div class="cart-content__item-img">
            <img src="../assets/img/no-img-placeholder.jpeg" alt="" />
          </div>
          <div class="cart-content__item-info">
            <div class="title-icon">
              <p>Adidas Shoes</p>

              <span class="delete-item">
                <svg class="delete-icon-bin">
                  <use xlink:href="../assets/img/sprite.svg#icon-bin" />
                </svg>
              </span>
            </div>
            <div class="quantityWprice">
              <div class="quantityWprice__quantity">
                <span
                  class="quantityWprice__quantity--1"
                  @click="
                    {
                    }
                  "
                  >-</span
                >
                <span>1</span>
                <span
                  class="quantityWprice__quantity--3"
                  @click="
                    {
                    }
                  "
                  >+</span
                >
              </div>

              <div class="quantityWprice__price">
                <p class="price-text">$89.99</p>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-content mt-sm">
          <div class="cart-content__item-img">
            <img src="../assets/img/no-img-placeholder.jpeg" alt="" />
          </div>
          <div class="cart-content__item-info">
            <div class="title-icon">
              <p>Adidas Shoes</p>

              <span class="delete-item">
                <svg class="delete-icon-bin">
                  <use xlink:href="../assets/img/sprite.svg#icon-bin" />
                </svg>
              </span>
            </div>
            <div class="quantityWprice">
              <div class="quantityWprice__quantity">
                <span
                  class="quantityWprice__quantity--1"
                  @click="
                    {
                    }
                  "
                  >-</span
                >
                <span>1</span>
                <span
                  class="quantityWprice__quantity--3"
                  @click="
                    {
                    }
                  "
                  >+</span
                >
              </div>

              <div class="quantityWprice__price">
                <p class="price-text">$89.99</p>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-content mt-sm">
          <div class="cart-content__item-img">
            <img src="../assets/img/no-img-placeholder.jpeg" alt="" />
          </div>
          <div class="cart-content__item-info">
            <div class="title-icon">
              <p>Adidas Shoes</p>

              <span class="delete-item">
                <svg class="delete-icon-bin">
                  <use xlink:href="../assets/img/sprite.svg#icon-bin" />
                </svg>
              </span>
            </div>
            <div class="quantityWprice">
              <div class="quantityWprice__quantity">
                <span
                  class="quantityWprice__quantity--1"
                  @click="
                    {
                    }
                  "
                  >-</span
                >
                <span>1</span>
                <span
                  class="quantityWprice__quantity--3"
                  @click="
                    {
                    }
                  "
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
export default {
  provide() {
    return {
      closeErrMsg: this.closeErrMsg,
    };
  },

  mounted() {
    this.fetchUserAddresses();
  },

  methods: {
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
    async submitPaymentHandler() {
      let checkoutUrl = "";
      const payload = {
        creditCardName: this.cdName,
        cardNumber: this.cdNumber,
        cardHolderName: this.cdHolderName,
        expirationDate: this.cdExpiration,
        cvv: this.cdCvv,
      };
      if (this.svCardChecbox) {
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
              shippingAddress: {
                addressName: this.addressName,
                address: this.address,
                country: this.country,
                state: this.state,
                city: this.city,
                street: this.street,
                zip: this.zipcode,
              },
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
        // send checkout request without saved card
        const payload = {
          shippingAddress: {
            addressName: this.addressName,
            address: this.address,
            country: this.country,
            state: this.state,
            city: this.city,
            street: this.street,
            zip: this.zipcode,
          },
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
            throw Error();
          } else {
            this.paymentfailed = false;
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
        this.moveToStage(2);
        setTimeout(() => {
          this.showErrMsg = false;
        }, 5000);
      }
    },
    moveToStage(stageNum) {
      switch (stageNum) {
        case 1:
          if (this.addressCheckbox) {
            console.log("running");
            this.fetchUserAddresses();
            this.selectedSavedAdress = this.userAddresses.length;
            this.useSavedAddressChck = true;
            this.addressCheckbox = false;
          }
          this.currentStage = 1;
          break;
        case 2:
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
      errMsg: "Something went wrong!",
      showErrMsg: false,
      paymentfailed: null,
      useSavedAddressChck: false,
      userAddresses: [],
      selectedSavedAdress: "0",
    };
  },
};
</script>

<style scoped lang="scss">
@import "./Cart.module.scss";
</style>
