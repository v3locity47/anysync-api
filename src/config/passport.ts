import passport from 'passport';
import fs from 'fs';
import { Request } from 'express';
import {
  Strategy as GoogleStrategy,
  StrategyOptionsWithRequest,
  VerifyCallback,
} from 'passport-google-oauth2';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { IGoogleProfile } from '../interfaces/user.interface';
import * as UserService from '../services/user.service';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const googleStrat = new GoogleStrategy(
  {
    clientID: process.env.OAUTH2_GOOGLE_CLIENT_ID,
    clientSecret: process.env.OAUTH2_GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/auth/google/callback',
    passReqToCallback: true,
  } as StrategyOptionsWithRequest,
  async (
    request: Request,
    accessToken: string,
    refreshToken: string,
    profile: IGoogleProfile,
    done: VerifyCallback
  ) => {
    const oauthId = profile.id;
    const user = await UserService.findOrCreate({
      uniqueKey: 'oauthId',
      value: oauthId,
      userProfile: profile,
    });
    return done(null, user);
  }
);

const PUBLIC_KEY = fs.readFileSync('./src/config/id_rsa.pub.pem', 'utf8');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUBLIC_KEY,
  algorithms: ['RS256'],
};

const jwtStrat = new JwtStrategy(
  jwtOptions,
  (payload, done: VerifyCallback) => {
    try {
      const { sub } = payload;
      return done(null, sub);
    } catch (err) {
      return done(null, false);
    }
  }
);

export { googleStrat, jwtStrat };
