import express from 'express';
import validateBody from '../middlewares/validateBody';
import { schemaSignIn, schemaSignup } from '../schemas/joi/joiValidator';
import signup from '../controllers/auth/signup';
import signIn from '../controllers/auth/signin';
import authentication from '../middlewares/authentication';
import signout from '../controllers/auth/signout';
import current from '../controllers/auth/current';
import handleAuthCallback from '../controllers/auth/handleAuth';
import passportGoogle from '../middlewares/googleAuthenticate';
import passportFacebook from '../middlewares/facebookAuthenticate';

const router = express.Router();

router.post('/signup', validateBody(schemaSignup), signup);
router.post('/signin', validateBody(schemaSignIn), signIn);
router.post('/signout', authentication, signout);
router.get('/current', authentication, current);
router.get(
  '/google',
  passportGoogle.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get(
  '/google/callback',
  passportGoogle.authenticate('google', { session: false }),
  handleAuthCallback,
);
router.get(
  '/facebook',
  passportFacebook.authenticate('facebook', { scope: ['email'] }),
);

router.get(
  '/facebook/callback',
  passportFacebook.authenticate('facebook', { session: false }),
  handleAuthCallback,
);
export default router;
