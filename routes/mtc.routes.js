import express from 'express';

import * as clientAuthMiddleware from '../middlewares/clientAuth.middleware.js';
import * as clientMiddleware from '../middlewares/client.middleware.js';
import * as consultationMiddleware from '../middlewares/consultation.middleware.js';
import * as consultationController from '../controllers/mtc.controllers.js';

const router = express.Router();

router.get('/', consultationController.findAll);
router.post('/', consultationController.create);

router
  .route('/:id')
  .get(consultationMiddleware.validExistConsultation, consultationController.findOne)
  // .post(clientMiddleware.validExistClient, consultationController.create)
  .patch(consultationMiddleware.validExistConsultation, consultationController.update)
  .delete(consultationMiddleware.validExistConsultation, consultationController.deleteElement);

const consultationRouter = router;

export { consultationRouter };
