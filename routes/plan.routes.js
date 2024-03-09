import express from 'express';

import * as userAuthMiddleware from '../middlewares/userAuth.middleware.js';
import * as planMiddleware from '../middlewares/plan.middleware.js';
import * as planController from '../controllers/plan.controllers.js';

const router = express.Router();

router.get('/', planController.findAll);
router.use(userAuthMiddleware.protect);

router
  .route('/:id')
  .get(planMiddleware.validExistPlan, planController.findOne)
  .post(planMiddleware.validExistPlan, planController.create)
  .patch(planMiddleware.validExistPlan, planController.update)
  .delete(planMiddleware.validExistPlan, planController.deleteElement);

const planRouter = router;

export { planRouter };
