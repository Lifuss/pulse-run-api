import passport from 'passport';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/user';

dotenv.config();

const { FACEBOOK_CLIENT_ID, FACEBOOK_SECRET_KEY, BASE_URL } = process.env;

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID || '',
      clientSecret: FACEBOOK_SECRET_KEY || '',
      callbackURL: `${BASE_URL}/api/auth/facebook/callback`,
      profileFields: ['id', 'emails', 'name', 'photos'],
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOne({
        facebookId: profile.id,
        provider: 'facebook',
      });
      if (!user) {
        const password = await bcrypt.hash(uuidv4(), 5);
        const verifyToken = uuidv4();
        const newUser = await User.create({
          email: profile.emails?.[0]?.value || '',
          password,
          profile: {
            firstName: profile.name?.givenName || '',
            lastName: profile.name?.familyName || '',
          },
          avatar: profile.photos?.[0]?.value || '',
          token: verifyToken,
          facebookId: profile.id,
          provider: 'facebook',
        });
        return cb(null, newUser);
      } else {
        user.avatar = profile.photos?.[0]?.value || '';
        await user.save();
        return cb(null, user);
      }
    },
  ),
);

export default passport;
