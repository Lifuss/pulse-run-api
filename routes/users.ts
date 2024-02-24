import express from 'express';
import validateBody from '../middlewares/validateBody';
import { schemaSubscribe } from '../schemas/joi/joiValidator';
import subscribeEmail from '../controllers/users/subscribeEmail';

const router = express.Router();

router.post('/subscribe', validateBody(schemaSubscribe), subscribeEmail);

export default router;
