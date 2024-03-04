import express from 'express';
import validateBody from '../middlewares/validateBody';
import { schemaSubscribe } from '../schemas/joi/joiValidator';
import subscribeEmail from '../controllers/users/subscribeEmail';
import authentication from '../middlewares/authentication';
import deleteUser from '../controllers/users/deleteUser';
import forgotPassword from '../controllers/users/forgotPassword';
import resetPassword from '../controllers/users/resetPassword';

const router = express.Router();

router.post('/subscribe', validateBody(schemaSubscribe), subscribeEmail);
router.delete('/', authentication, deleteUser);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password', resetPassword);
export default router;
