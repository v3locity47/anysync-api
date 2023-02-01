import express from 'express';
import passport from 'passport';
import {
  editProfile,
  addFriend,
  getLoggedInUser,
} from '../controllers/user.controller';
import { checkAuthentication } from '../middlewares/authentication.middleware';

const router = express.Router();

router.put(
  '/edit',
  passport.authenticate('google', {
    failureRedirect: '/auth/google/failed',
  }),
  editProfile
);
router.put('/add-friend', checkAuthentication, addFriend);

router.get('/current', getLoggedInUser);
export default router;
