import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from "bcrypt";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  const user = await User.findOne({ email });

  if (!user) return done(null, false, { message: 'No user found' });
  if (!user.verified) return done(null, false, { message: 'Please verify your email' });

  if (!user.password) return done(null, false, { message: 'Password not set' });
  if(password === '') return done(null, false, { message: 'Password cannot be empty' });

  const match = await bcrypt.compare(password, user.password);
  return match ? done(null, user) : done(null, false, { message: 'Incorrect password' });
}));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
