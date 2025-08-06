import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import path from "path";

import { connectDB } from "./src/lib/db.js";
import session from "express-session";
import passport from "passport";

import authRoutes from "./src/routes/auth.js";
import txRoutes from "./src/routes/transactions.js";
import receiptRoutes from "./src/routes/receipt.js";

dotenv.config();

import "./src/config/passport.js";

const PORT = process.env.PORT;
const __dirname = path.resolve();

const app = express();
app.use(express.json());

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/transactions", txRoutes);
app.use("/api/receipt", receiptRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
  connectDB();
});
