import express from "express";
import passport from "passport";
import { signInSuccess } from "../controllers/userController";

const router = express.Router();

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failed",
    successRedirect: "/auth/google/success",
  })
);

router.get("/", (req, res) => {
  console.log(req, res);
  res.status(200).send("OK");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/auth/google/success", signInSuccess);

export default router;
