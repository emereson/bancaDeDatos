import express from 'express';

import * as clientMiddleware from '../middlewares/client.middleware.js';
import * as clientAuthMiddleware from '../middlewares/clientAuth.middleware.js';
import * as clientController from '../controllers/client.controllers.js';

const router = express.Router();

router.post('/login', clientController.login);
router.post('/signup', clientController.signup);
router.get('/:id', clientMiddleware.validExistClient, clientController.findOne);
router.post(
  '/forgot-password',
  clientMiddleware.validExistClient,
  clientController.forgotPassword
);
router.post(
  '/verification-code',
  clientMiddleware.validExistClient,
  clientController.verificationCode
);
router.post(
  '/new-password',
  clientMiddleware.validExistClient,
  clientController.newPassword
);

router.use(clientAuthMiddleware.protect);


router
  .route('/:id')
  .delete(clientMiddleware.validExistClient, clientController.deleteClient)
  .patch(clientMiddleware.validExistClient, clientController.update);

const clientRouter = router;

export { clientRouter };
