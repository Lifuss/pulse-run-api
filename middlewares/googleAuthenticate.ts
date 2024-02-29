import dotenv from 'dotenv';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { Strategy } from 'passport-google-oauth2';
import passport from 'passport';

dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID || '',
  clientSecret: GOOGLE_CLIENT_SECRET || '',
  callbackURL: `${BASE_URL}/api/auth/google/callback`,
  passReqToCallback: true as true,
};

const googleCallback = async (
  email: string,
  displayName: string,
  done: any,
) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      return done(null, user);
    }
    const password = await bcrypt.hash(nanoid(), 5);
    const verifyToken = nanoid();
    const newUser = await User.create({
      email,
      password,
      profile: {
        firstName: displayName,
        lastName: displayName,
        phone: '',
      },
      token: verifyToken,
    });
    done(null, newUser);
  } catch (error) {
    done(error);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);
passport.use('google', googleStrategy);

export default passport;
