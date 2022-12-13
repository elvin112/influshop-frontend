<template>
  <Transition>
    <ErrorMsg v-if="showErrMsg" :msg="errMsg" />
  </Transition>
  <Transition>
    <SimpleAlertMsg v-if="showAlertMsg" :msg="alertMsg" />
  </Transition>
  <BaseCard class="min-content">
    <form class="stage-form" v-show="caType === 'address'">
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
          v-model="addressLng"
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
    </form>
    <form class="stage-form" v-show="caType === 'card'">
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
    </form>
    <template #buttons>
      <div class="form-button-control">
        <button class="btn btn--success" @click="updateHandler">Update</button>
        <button
          class="btn btn--cancel"
          type="submit"
          @click="closeCAUpdatePopup()"
        >
          Cancel
        </button>
      </div>
    </template>
  </BaseCard>
</template>

<script>
import { isProxy, toRaw } from "vue";

export default {
  props: ["caType", "address", "card"],
  inject: ["closeCAUpdatePopup"],

  data() {
    return {
      alertMsg: "Process done!",
      showAlertMsg: false,
      errMsg: "Something went wrong!",
      showErrMsg: false,
      addressName: "sfd",
      addressLng: "",
      country: "",
      state: "",
      city: "",
      street: "",
      zipcode: "",
      addressId: "",
      cdName: "",
      cdHolderName: "",
      cdNumber: "",
      cdExpiration: "",
      cdCvv: "",
    };
  },
  mounted() {
    if (this.caType === "card") {
      this.loadCardForm();
    } else if (this.caType === "address") {
      this.loadAddressForm();
    }
  },
  methods: {
    loadAddressForm() {
      if (isProxy(this.address)) {
        const elem = toRaw(this.address);
        this.addressName = elem.addressName;
        this.addressLng = elem.address;
        this.country = elem.country;
        this.state = elem.state;
        this.city = elem.city;
        this.street = elem.street;
        this.zipcode = elem.zip;
        this.addressId = elem.id;
      }
    },
    loadCardForm() {
      if (isProxy(this.address)) {
        const elem = toRaw(this.address);
        this.addressName = elem.addressName;
        this.addressLng = elem.address;
        this.country = elem.country;
        this.state = elem.state;
        this.city = elem.city;
        this.street = elem.street;
        this.zipcode = elem.zip;
        this.addressId = elem.id;

        const payload = {
          creditCardName: this.cdName,
          cardNumber: this.cdNumber,
          cardHolderName: this.cdHolderName,
          expirationDate: this.cdExpiration,
          cvv: this.cdCvv,
        };
      }
    },
    async updateHandler() {
      if (this.caType === "card") {
        // send update request for card
      } else if (this.caType === "address") {
        // send update request for address

        const payload = {
          id: this.addressId,
          addressName: this.addressName,
          address: this.addressLng,
          country: this.country,
          state: this.state,
          city: this.city,
          street: this.street,
          zip: this.zipcode,
        };

        try {
          const response = await fetch(
            `http://localhost:8080/api/v1/settings/address`,
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
            throw Error();
          } else {
            this.closeCAUpdatePopup("address");
          }
        } catch (error) {
          this.errMsg = "Address could not be saved!";
          this.showErrMsg = true;
          setTimeout(() => {
            this.showErrMsg = false;
          }, 5000);
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.header__title {
  font-family: "Montserrat", sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
}

.header__par {
  font-family: "Montserrat", sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  display: inline-block;
}

.header__par:first-letter {
  text-transform: uppercase;
}

.btn {
  padding: 0.53rem 1.47rem;
  width: 100%;
}
.btn:not(last-child) {
  margin-right: 1rem;
}

.form-control {
  &__submitAddress {
    grid-column: 1 / -1;
    // background-color: black;
    // box-shadow: none;
    border-radius: 10px;
  }
  &:not(-first-child) {
    margin-top: 1rem;
  }

  &__submitAddress:hover {
    // background-color: rgba(0, 0, 0, 0.769);
  }
  &__submitCard {
    grid-column: 1 / -1;
    // background-color: black;
    // box-shadow: none;
    border-radius: 10px;
  }

  &__submitCard:hover {
    // background-color: rgba(0, 0, 0, 0.769);
  }
  label {
    color: var(--color-grey-light-4);
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    font-size: 0.85rem;
  }
  display: flex;
  flex-direction: column;
  input {
    margin-top: 0.2rem;
    border-radius: var(--input-border-radius);
    padding: 0.55rem 0.35rem;
    border: 1px solid #717b8c69;
    font-family: "Montserrat", sans-serif;
    font-weight: 500;
    font-size: 0.85rem;
  }

  input::placeholder {
    color: var(--color-grey-light-7);
  }

  input:hover {
    outline: none;
    border: 1px solid rgba(0, 0, 255, 0.354);
  }

  input:focus {
    outline: none;
    border: 1px solid blue;
  }
}
</style>
