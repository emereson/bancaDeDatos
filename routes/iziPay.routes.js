import express from 'express';

import * as iziPayController from '../controllers/izipay.controllers.js';

const router = express.Router();

router.post('/createPayment', iziPayController.createFormToken);
router.post('/validatePayment', iziPayController.validPayments);
// router.post('/ipn', iziPayController.notificationIPN);

const iziPayRouter = router;

export { iziPayRouter };
