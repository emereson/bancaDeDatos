import axios from 'axios';
import hmacSHA256 from 'crypto-js/hmac-sha256.js';
import Hex from 'crypto-js/enc-hex.js';
import { catchAsync } from '../utils/catchAsync.js';
import { create } from './clientControllers/clientOrder.controllers.js';

const username = process.env.ID_TIENDA;
const password = process.env.IZIPAY_PASSWORD;
const publicKey = process.env.IZIPAY_PUBLIC_KEY;
const hmac256 = process.env.CLAVE_HMAC_SHA_256;

export const createFormToken = catchAsync(async (req, res) => {
  const dataPay = req.body;

  // format: api.my.psp.domain.name without https
  const endpoint = 'api.micuentaweb.pe';

  const options = {
    method: 'POST',
    url: `https://${username}:${password}@${endpoint}/api-payment/V4/Charge/CreatePayment`,
    headers: {
      Authorization: publicKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: {
      amount: Number(dataPay.totalPrice) * 100,
      currency: 'PEN',
      orderId: 'myOrderId-999999',
      customer: {
        email: 'sample@example.com',
      },
    },
  };

  try {
    const { data } = await axios.request(options);
    return res.status(200).json(data.answer.formToken); // Devuelve la respuesta como JSON
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
    // Puedes elegir manejar el error de manera específica según tus necesidades
  }
});

export const validPayments = catchAsync(async (req, res) => {
  const dataPay = req.body.dataPay;
  const io = req.app.get('io');
  const userData = req.body.userData;
  const answer = req.body.paymentData.clientAnswer;
  const hash = req.body.paymentData.hash;
  const answerHash = Hex.stringify(hmacSHA256(JSON.stringify(answer), hmac256));

  if (hash === answerHash) {
    create(userData.id, dataPay);
    res.status(200).send('Valid payment');
    io.emit('validPay', { data: 'approved' });
  } else {
    res.status(500).send('Payment hash mismatch');
  }
});
