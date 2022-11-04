import express from 'express';
import passport from 'passport';
import { editProfile, addFriend } from '../controllers/user.controller';

const router = express.Router();

router.put(
  '/edit',
  passport.authenticate('google', {
    failureRedirect: '/auth/google/failed',
  }),
  editProfile
);
router.put(
  '/add-friend',
  passport.authenticate('jwt', { session: false }),
  addFriend
);

export default router;
