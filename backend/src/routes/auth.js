import express from "express";
import passport from "passport";
import {
  registerUser,
  verifyEmail,
  loginUser,
  googleAuth,
  googleCallback,
  getCurrentUser,
  logoutUser
} from "../controllers/auth-controllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:token", verifyEmail);
router.post("/login", loginUser);

router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}), googleAuth);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleCallback
);

router.get("/me", getCurrentUser);
router.get("/logout", logoutUser);

export default router;
