import express from 'express';
import validateBody from '../middlewares/validateBody';
import { schemaSignIn, schemaSignup } from '../schemas/joi/joiValidator';
import signup from '../controllers/auth/signup';
import signIn from '../controllers/auth/signin';
import authentication from '../middlewares/authentication';
import signout from '../controllers/auth/signout';
import current from '../controllers/auth/current';
import googleAuth from '../controllers/auth/google';
import passport from '../middlewares/googleAuthenticate';
// import passport from 'passport';

const router = express.Router();

router.post('/signup', validateBody(schemaSignup), signup);
router.post('/signin', validateBody(schemaSignIn), signIn);
router.post('/signout', authentication, signout);
router.get('/current', authentication, current);
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  googleAuth,
);

export default router;
