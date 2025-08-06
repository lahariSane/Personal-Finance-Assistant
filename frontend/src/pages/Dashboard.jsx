import React, { useEffect } from "react";
import TransactionSummaryCards from "../components/dashboard/TransactionSummaryCards";
import TransactionList from "../components/dashboard/TransactionList";
import QuickActions from "../components/dashboard/QuickActions";
import ExpensesPieChart from "../components/charts/ExpensesPieChart";
import IncomeVsExpensesChart from "../components/charts/IncomeVsExpensesChart";
import useAuthStore from "../store/authStore";
import useTransactionStore from "../store/transactionStore";
import AuthLoadingScreen from "../components/AuthLoadingScreen";
import {
  getDateRange,
  getMonthlyTrends,
  getExpensesByCategory,
  formatCurrency,
} from "../utils/reportsUtils";

const Dashboard = () => {
  const { user, loading: userLoading, fetchCurrentUser } = useAuthStore();
  const {
    transactions,
    loading: transactionsLoading,
    error,
    fetchUserTransactions,
  } = useTransactionStore();

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!user) {
          await fetchCurrentUser();
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    loadUser();
  }, [fetchCurrentUser, user]);

  useEffect(() => {
    const loadTransactions = async () => {
      if (user?._id || user?.id) {
        const userId = user._id || user.id;
        const { start, end } = getDateRange("overall");
        await fetchUserTransactions(userId, start, end);
      }
    };

    loadTransactions();
  }, [user, fetchUserTransactions]);

  const isLoading = userLoading || transactionsLoading;

  const monthlyTrends = getMonthlyTrends(transactions || []);
  const expensesByCategory = getExpensesByCategory(transactions || []);

  if (isLoading) {
    return (
      <AuthLoadingScreen message="Loading your dashboard..." />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-6 pt-16">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Hi, Lahari!!</h1>
      <p className="text-gray-600 mb-6 text-md font-semibold">
        Welcome to your personal finance dashboard! Here you can track your
        income, expenses, and financial health at a glance.
      </p>

      {/* Transaction Summary Cards */}
      <TransactionSummaryCards transactions={transactions} />

      {/* Transactions and Quick Actions */}
      <div className="flex flex-col md:flex-row gap-6">
        <TransactionList transactions={transactions} />
        <QuickActions />
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {/* Heading with View All */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Graphs</h2>
          <button
            onClick={() => (window.location.href = "/analytics")}
            className="text-blue-600 hover:underline font-medium"
          >
            View All →
          </button>
        </div>

        {/* Graphs */}
        <div className="flex flex-col lg:flex-row gap-6">
          <ExpensesPieChart
            data={expensesByCategory}
            formatCurrency={formatCurrency}
          />
          <IncomeVsExpensesChart
            data={monthlyTrends}
            formatCurrency={formatCurrency}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
