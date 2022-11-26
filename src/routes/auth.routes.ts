import express from 'express';
import passport from 'passport';
import {
  signInSuccess,
  checkAuthentication,
} from '../controllers/user.controller';

const router = express.Router();

router.get(
  '/google/callback',
  (req, res, next) => {
    // console.log(req.headers);
    // console.log(req.user);
    // console.log(req.originalUrl);
    console.log(`YES: ${req.isAuthenticated()}`);
    console.log(req.session);
    next();
  },
  passport.authenticate('google', {
    failureRedirect: '/auth/google/failed',
    successRedirect: '/auth/google/success',
    keepSessionInfo: true,
  })
);

router.get('/', (req, res) => {
  console.log(req, res);
  res.status(200).send('OK');
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/google/success', signInSuccess);
router.get('/check-auth', checkAuthentication);

export default router;
