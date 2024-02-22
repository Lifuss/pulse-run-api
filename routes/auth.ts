import express from 'express';
import validateBody from '../middlewares/validateBody';
import { schemaSignIn, schemaSignup } from '../schemas/joi/joiValidator';
import signup from '../controllers/auth/signup';
import signIn from '../controllers/auth/signin';
import authentication from '../middlewares/authentication';
import signout from '../controllers/auth/signout';

const router = express.Router();

router.post('/signup', validateBody(schemaSignup), signup);
router.post('/signin', validateBody(schemaSignIn), signIn);
router.post('/signout', authentication, signout);

export default router;
