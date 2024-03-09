import express from 'express';

import * as clientAuthMiddleware from '../middlewares/clientAuth.middleware.js';
import * as clientMiddleware from '../middlewares/client.middleware.js';
import * as buyPlanMiddleware from '../middlewares/buyPlan.middleware.js';
import * as buyPlanController from '../controllers/buyPlan.controllers.js';

const router = express.Router();

router.get('/', buyPlanController.findAll);
router.use(clientAuthMiddleware.protect);

router
  .route('/:id')
  .get(buyPlanMiddleware.validExistBuyPlan, buyPlanController.findOne)
  .post(clientMiddleware.validExistClient, buyPlanController.create)
  .delete(buyPlanMiddleware.validExistBuyPlan, buyPlanController.deleteElement);

const buyPlanRouter = router;

export { buyPlanRouter };
