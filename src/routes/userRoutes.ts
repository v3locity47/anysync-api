import express from "express";
import passport from "passport";
import { editProfile, addFriend } from "../controllers/userController";

const router = express.Router();

router.put(
  "/users/edit",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failed",
  }),
  editProfile
);
router.put(
  "/users/add-friend",
  passport.authenticate("jwt", { session: false }),
  addFriend
);

export default router;
