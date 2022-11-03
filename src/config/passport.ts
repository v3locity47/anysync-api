import passport from "passport";
import {
  Strategy as GoogleStrategy,
  StrategyOptionsWithRequest,
  VerifyCallback,
} from "passport-google-oauth2";
import { Request } from "express";
import { IGoogleProfile } from "../interfaces/userInterface";
import * as UserService from "../services/userService";

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
    callbackURL: "http://localhost:8000/auth/google/callback",
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
      uniqueKey: "oauthId",
      value: oauthId,
      userProfile: profile,
    });
    return done(null, user);
  }
);

export { googleStrat };
