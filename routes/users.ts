import express from 'express';
import validateBody from '../middlewares/validateBody';
import { schemaSubscribe } from '../schemas/joi/joiValidator';
import subscribeEmail from '../controllers/users/subscribeEmail';
import authentication from '../middlewares/authentication';
import deleteUser from '../controllers/users/deleteUser';

const router = express.Router();

router.post('/subscribe', validateBody(schemaSubscribe), subscribeEmail);
router.delete('/', authentication, deleteUser);
export default router;
