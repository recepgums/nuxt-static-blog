<template>
  <div>
    <form @submit.prevent="submitForm">
      <label for="cardNumber">Card Number:</label>
      <input type="text" id="cardNumber" v-model="cardNumber">
      <label for="cardHolderName">Card Holder Name:</label>
      <input type="text" id="cardHolderName" v-model="cardHolderName">
      <label for="expiryMonth">Expiry Month:</label>
      <input type="text" id="expiryMonth" v-model="expiryMonth">
      <label for="expiryYear">Expiry Year:</label>
      <input type="text" id="expiryYear" v-model="expiryYear">
      <label for="cvv">CVV:</label>
      <input type="text" id="cvv" v-model="cvv">
      <button type="submit">Pay Now</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cardNumber: '',
      cardHolderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: ''
    };
  },
  methods:{
    async submitForm() {
      const iyzico = this.$iyzico;
      const request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: '123456789',
        price: '10',
        paidPrice: '10',
        currency: Iyzipay.CURRENCY.TRY,
        installment: 1,
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard: {
          cardHolderName: this.cardHolderName,
          cardNumber: this.cardNumber,
          expireMonth: this.expiryMonth,
          expireYear: this.expiryYear,
          cvc: this.cvv
        },
        buyer: {
          id: '123456789',
          name: 'John',
          surname: 'Doe',
          identityNumber: '11111111111',
          email: 'john@doe.com',
          registrationAddress: 'Istanbul',
          city: 'Istanbul',
          country: 'Turkey',
          zipCode: '34000',
          ip: '85.34.78.112'
        },
        shippingAddress: {
          contactName: 'John Doe',
          city: 'Istanbul',
          country: 'Turkey',
          zipCode: '34000'
        },
        billingAddress: {
          contactName: 'John Doe',
          city: 'Istanbul',
          address: 'Istanbul',
          country: 'Turkey',
          zipCode: '34000'
        },
        basketItems: [
          {
            id: '1',
            name: 'Product Name',
            category1: 'Category',
            itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price: '10'
          }
        ],
        threeDSecure: {
          enabled: true,
          liabilityShift: true
        }
      };

      try {
        const payment = await iyzico.payment.create(request);
        console.log(payment);
        // Payment is successful, show a success message to the user
      } catch (error) {
        console.error(error);
        // Payment failed, show an error message to the user
      }
    }
  }
}
</script>
