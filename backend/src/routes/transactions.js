import express from "express";
import isLoggedIn from "../middleware/isLoggedIn.js";
import {
  getLatestTransactions,
  getTransactionsByUserAndDate,
  createTransaction,
  deleteTransaction,
  updateTransaction
} from "../controllers/transaction-controllers.js";
import { upload } from "../config/multerConfig.js"

const router = express.Router();


router.get("/", isLoggedIn, getLatestTransactions);
router.get("/user/:userid", isLoggedIn, getTransactionsByUserAndDate);
router.post("/", isLoggedIn, createTransaction);
router.put("/:id", isLoggedIn, updateTransaction);
router.delete("/:id", isLoggedIn, deleteTransaction);

export default router;
