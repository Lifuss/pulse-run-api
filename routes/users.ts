import express from 'express';
import validateBody from '../middlewares/validateBody';
import {
  schemaFavorite,
  schemaPayment,
  schemaSubscribe,
  schemaSupport,
  schemaUpdateUser,
} from '../schemas/joi/joiValidator';
import subscribeEmail from '../controllers/users/subscribeEmail';
import authentication from '../middlewares/authentication';
import deleteUser from '../controllers/users/deleteUser';
import forgotPassword from '../controllers/users/forgotPassword';
import resetPassword from '../controllers/users/resetPassword';
import updateUser from '../controllers/users/updateUser';
import upload from '../middlewares/upload';
import createSupportTicket from '../controllers/users/supportTicket';
import addPayment from '../controllers/users/addPayment';
import deletePayment from '../controllers/users/deletePayment';
import addFavorite from '../controllers/users/addFavorite';
import deleteFavorite from '../controllers/users/deleteFavorite';
import getFavorites from '../controllers/users/getFavorites';

const router = express.Router();
router.get('/favorites', authentication, getFavorites);
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
router.patch(
  '/favorites',
  authentication,
  validateBody(schemaFavorite),
  addFavorite,
);
router.delete(
  '/favorites',
  authentication,
  validateBody(schemaFavorite),
  deleteFavorite,
);
router.post(
  '/payments',
  authentication,
  validateBody(schemaPayment),
  addPayment,
);
router.delete('/payments/:paymentId', authentication, deletePayment);
router.post('/supports', validateBody(schemaSupport), createSupportTicket);
export default router;
