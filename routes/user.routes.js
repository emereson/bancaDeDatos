import express from 'express';
import * as userMiddleware from '../middlewares/user.middleware.js';
import * as userAuthMiddleware from '../middlewares/userAuth.middleware.js';
import * as userController from '../controllers/user.controllers.js';
import * as clientController from '../controllers/client.controllers.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.use(userAuthMiddleware.protect);
router.get('/', userController.findAll);
router.get('/clients', clientController.findAll);

router.patch(
  '/update-password',
  userMiddleware.validExistUser,
  userController.updatePassword
);
router.patch(
  '/update-img',
  upload.single('studentImg'),
  userMiddleware.validExistUser,
  userController.updateImg
);

router
  .route('/:id')
  .delete(userMiddleware.validExistUser, userController.deleteUser)
  .patch(userMiddleware.validExistUser, userController.update)
  .get(userMiddleware.validExistUser, userController.findOne);

const usersRouter = router;

export { usersRouter };
