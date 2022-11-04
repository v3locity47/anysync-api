import express from 'express';
import passport from 'passport';
import { signInSuccess } from '../controllers/user.controller';

const router = express.Router();

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/google/failed',
    successRedirect: '/auth/google/success',
  })
);

router.get('/', (req, res) => {
  console.log(req, res);
  res.status(200).send('OK');
});

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/success', signInSuccess);

export default router;
