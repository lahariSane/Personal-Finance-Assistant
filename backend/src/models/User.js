import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  password: String,
  verified: { type: Boolean, default: false },
  verificationToken: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
