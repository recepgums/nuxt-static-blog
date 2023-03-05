import Iyzipay from 'iyzipay';

const options = {
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_SECRET_KEY,
  uri: 'https://sandbox-api.iyzipay.com'
};

export default ({ app }, inject) => {
  const iyzico = new Iyzipay(options);
  inject('iyzico', iyzico);
};
