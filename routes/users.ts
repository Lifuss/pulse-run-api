import express from 'express';
import validateBody from '../middlewares/validateBody';
import { schemaSubscribe, schemaUpdateUser } from '../schemas/joi/joiValidator';
import subscribeEmail from '../controllers/users/subscribeEmail';
import authentication from '../middlewares/authentication';
import deleteUser from '../controllers/users/deleteUser';
import forgotPassword from '../controllers/users/forgotPassword';
import resetPassword from '../controllers/users/resetPassword';
import updateUser from '../controllers/users/updateUser';
import upload from '../middlewares/upload';

const router = express.Router();

router.post('/subscribe', validateBody(schemaSubscribe), subscribeEmail);
router.delete('/', authentication, deleteUser);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password', resetPassword);
router.patch(
  '/',
  authentication,
  upload.single('avatar'),
  validateBody(schemaUpdateUser),
  updateUser,
);
export default router;
