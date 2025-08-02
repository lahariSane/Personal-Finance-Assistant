import Transaction from "../models/Transaction.js";

export const getLatestTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(100);

    res.json({
      success: true,
      data: transactions,
      count: transactions.length,
    });
  } catch (error) {
    console.error("Get transactions error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
    });
  }
};

// No limit get transactions by user and date range
export const getTransactionsByUserAndDate = async (req, res) => {
  try {
    const { userid } = req.params;
    const { start, end } = req.query;

    const query = { userId: userid };
    if (start && end) {
      query.date = {
        $gte: new Date(start),
        $lte: new Date(end),
      };
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });

    res.json({
      success: true,
      data: transactions,
      count: transactions.length,
    });
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user transactions",
    });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const {
      type,
      amount,
      description,
      category,
      date,
      paymentMethod,
      notes,
      recurring,
      frequency,
    } = req.body;

    if (!type || !["income", "expense"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Transaction type must be either "income" or "expense"',
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a positive number",
      });
    }

    if (!description || description.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const transaction = new Transaction({
      userId: req.user.id,
      type,
      amount: Number.parseFloat(amount),
      description: description.trim(),
      category,
      date: new Date(date),
      paymentMethod: paymentMethod || null,
      notes: notes ? notes.trim() : null,
      recurring: recurring || false,
      frequency: recurring ? frequency : null,
    });

    await transaction.save();

    res.status(201).json({
      success: true,
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} added successfully`,
      data: transaction,
    });
  } catch (error) {
    console.error("Create transaction error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create transaction",
    });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      type,
      amount,
      description,
      category,
      date,
      paymentMethod,
      notes,
      recurring,
      frequency,
    } = req.body;
    if (!type || !["income", "expense"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Transaction type must be either "income" or "expense"',
      });
    }

    const transaction = await Transaction.findByIdAndUpdate(
      id,
      {
        type,
        amount: Number.parseFloat(amount),
        description: description.trim(),
        category,
        date: new Date(date),
        paymentMethod: paymentMethod || null,
        notes: notes ? notes.trim() : null,
        recurring: recurring || false,
        frequency: recurring ? frequency : null,
      },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.json({
      success: true,
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    console.error("Update transaction error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update transaction",
    });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    res.json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.error("Delete transaction error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete transaction",
    });
  }
};
