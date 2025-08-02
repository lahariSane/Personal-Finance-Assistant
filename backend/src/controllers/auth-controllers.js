import User from "../models/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import passport from "passport";
import { sendVerificationEmail } from "../helpers/emailVerification.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });
    await sendVerificationEmail(email, verificationToken);
    res
      .status(201)
      .json({
        message: "User registered successfully. Please verify your email.",
      });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    user.verified = true;
    user.verificationToken = undefined; // Clear the token after verification
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return res.status(500).json({ message: "Login failed" });
      }
      res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
};

export const googleAuth = (req, res, next) => {
  // Handled by passport middleware
  next();
};

export const googleCallback = (req, res) => {
  res.redirect("http://localhost:5173/dashboard"); // your frontend URL
};

export const getCurrentUser = (req, res) => {
  if (req.user) {
    res.json({
      _id: req.user._id,
      googleId: req.user.googleId,
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    res.status(401).json({
      message: "User not authenticated",
    });
  }
};

export const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });

    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: "Session destroy failed" });

      res.clearCookie("connect.sid"); // Clear session cookie
      return res.status(200).json({ message: "Logged out" });
    });
  });
};
