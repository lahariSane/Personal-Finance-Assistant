export const getDateRange = (option) => {
  const now = new Date();
  let start, end;
  switch (option) {
    case "thisMonth":
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      break;
    case "lastMonth":
      start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      end = new Date(now.getFullYear(), now.getMonth(), 0);
      break;
    case "thisYear":
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31);
      break;
    default:
      start = null;
      end = null;
  }
  return {
    start: start ? start.toISOString().split("T")[0] : "",
    end: end ? end.toISOString().split("T")[0] : "",
  };
};

export const getMonthlyTrends = (transactions) => {
  const monthlyData = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
    const monthName = date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthName,
        income: 0,
        expenses: 0,
        transactions: 0,
      };
    }

    if (transaction.type === "income") {
      monthlyData[monthKey].income += transaction.amount;
    } else {
      monthlyData[monthKey].expenses += transaction.amount;
    }

    monthlyData[monthKey].transactions += 1;
  });

  return Object.values(monthlyData)
    .sort((a, b) => new Date(a.month) - new Date(b.month))
    .slice(-12); // Last 12 months
};

export const topFiveExpenses = (transactions) => {
  const categoryTotals = {};
  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
  transactions
    .filter((t) => t.type === "expense")
    .forEach((transaction) => {
      if (!categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] = {
          category: transaction.category,
          amount: 0,
          color: colors[Object.keys(categoryTotals).length % colors.length],
        };
      }
      categoryTotals[transaction.category].amount += transaction.amount;
    });
  return Object.values(categoryTotals)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5); // Top 5 expenses
};

export const getExpensesByCategory = (transactions) => {
  const categoryTotals = {};
  const colors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#84CC16",
    "#F97316",
  ];

  transactions
    .filter((t) => t.type === "expense")
    .forEach((transaction) => {
      if (!categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] = {
          category: transaction.category,
          amount: 0,
          color: colors[Object.keys(categoryTotals).length % colors.length],
        };
      }
      categoryTotals[transaction.category].amount += transaction.amount;
    });

  const total = Object.values(categoryTotals).reduce(
    (sum, cat) => sum + cat.amount,
    0
  );

  return Object.values(categoryTotals)
    .map((cat) => ({
      ...cat,
      percentage: total > 0 ? Math.round((cat.amount / total) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 6); // Top 6 categories
};

export const getPaymentMethods = (transactions) => {
  const methodTotals = {};

  transactions.forEach((transaction) => {
    const method = transaction.paymentMethod?.toLowerCase?.() || "unknown";
    if (!methodTotals[method]) {
      methodTotals[method] = 0;
    }
    methodTotals[method] += transaction.amount || 0;
  });

  console.log("Payment Method Totals:", Object.entries(methodTotals).map(([method, amount]) => ({
    method,
    amount,
  }) || []));

  return Object.entries(methodTotals).map(([method, amount]) => ({
    method,
    amount,
  }) || []);
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
};
