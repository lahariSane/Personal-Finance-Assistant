import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
    recurring: {
      type: Boolean,
      default: false,
    },
    frequency: {
      type: String,
      enum: ["Daily", "Weekly", "Bi-weekly", "Monthly", "Quarterly", "Yearly"],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ userId: 1, type: 1 });
transactionSchema.index({ userId: 1, category: 1 });

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
