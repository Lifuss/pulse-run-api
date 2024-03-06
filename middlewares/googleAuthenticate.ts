/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import { Strategy } from 'passport-google-oauth2';
import passport from 'passport';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID || '',
  clientSecret: GOOGLE_CLIENT_SECRET || '',
  callbackURL: `${BASE_URL}/api/auth/google/callback`,
  passReqToCallback: true as const,
};

const googleCallback = async (
  request: any,
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: any,
) => {
  try {
    const { email, name, picture } = profile;
    const user = await User.findOne({ email });
    if (user) {
      return done(null, user);
    }
    const password = await bcrypt.hash(uuidv4(), 5);
    const verifyToken = uuidv4();
    const newUser = await User.create({
      email,
      password,
      profile: {
        firstName: name.givenName,
        lastName: name.familyName,
      },
      avatar: picture,
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
