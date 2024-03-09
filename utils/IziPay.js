const axios = require('axios').default;

exports.createFormToken = async (paymentConf) => {
  // format: 123456789
  const username = '78651207';

  // format: testprivatekey_XXXXXXX
  const password = 'testpassword_eeefjdtuNq9w15Fpp03YSmJuNbYvRzP3DSjvcZ5IiOFdg';

  // format: api.my.psp.domain.name without https
  const endpoint = 'noderolex-production.up.railway.app/api/v1';

  const createPaymentEndpoint = `https://${username}:${password}@${endpoint}/api-payment/V4/Charge/CreatePayment`;

  try {
    const response = await axios.post(createPaymentEndpoint, paymentConf, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response?.data?.answer?.formToken) throw response;
    return response.data.answer.formToken;
  } catch (error) {
    throw error;
  }
};
