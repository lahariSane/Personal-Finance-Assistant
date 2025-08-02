"use client";

import React, { useState, useEffect, useCallback } from "react";
import useAuthStore from "../store/authStore";
import useTransactionStore from "../store/transactionStore";
import ExpensesPieChart from "../components/charts/ExpensesPieChart";
import MonthlyTrendsChart from "../components/charts/MonthlyTrendsChart";
import IncomeVsExpensesChart from "../components/charts/IncomeVsExpensesChart";
import TopExpensesChart from "../components/charts/TopExpensesChart";
import ReportsDateFilter from "../components/analytics/ReportsDateFilter";
import PaymentMethodPieChart from "../components/charts/PaymentMethodPieChart";
import ErrorAlert from "../components/ErrorAlert";
import {
  getDateRange,
  topFiveExpenses,
  getMonthlyTrends,
  getExpensesByCategory,
  getPaymentMethods,
  formatCurrency,
} from "../utils/reportsUtils";

// Reusable loading spinner
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Loading reports...</span>
  </div>
);

// No data state component
const NoDataState = () => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
    <svg
      className="w-16 h-16 text-gray-400 mx-auto mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
    <p className="text-gray-600 text-lg mb-4">No transaction data available</p>
    <p className="text-gray-500">Add some transactions to see your analytics</p>
  </div>
);

const Analytics = () => {
  const { user, loading: userLoading, fetchCurrentUser } = useAuthStore();
  const { transactions, loading, error, fetchUserTransactions, resetMessages } =
    useTransactionStore();

  const [dateRange, setDateRange] = useState("thisMonth");

  // Fetch current user on component mount
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

  // Fetch transactions when user is available and date range changes
  useEffect(() => {
    const loadTransactions = async () => {
      if (user?._id || user?.id) {
        const userId = user._id || user.id;
        const { start, end } = getDateRange(dateRange);
        await fetchUserTransactions(userId, start, end);
      }
    };

    loadTransactions();
  }, [user, dateRange, fetchUserTransactions]);

  // Calculate all data for charts and tables
  const monthlyTrends = getMonthlyTrends(transactions || []);
  const expensesByCategory = getExpensesByCategory(transactions || []);
  const topExpenses = topFiveExpenses(transactions || []);
  const paymentMethods = getPaymentMethods(transactions || []);

  // Show loading while user data is being fetched
  if (userLoading) {
    return (
      <div className="space-y-6 p-4 pt-16">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  // Show message if no user is found
  if (!user) {
    return (
      <div className="space-y-6 p-4 pt-16">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">
            Please log in to view your analytics.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6 p-4 pt-16">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <ReportsDateFilter
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="space-y-6 p-4 pt-16">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <ReportsDateFilter
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </div>
        <ErrorAlert error={error} onClose={resetMessages} />
      </div>
    );
  }

  // No data state
  if (!transactions || transactions.length === 0) {
    return (
      <div className="space-y-6 p-4 pt-16">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <ReportsDateFilter
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </div>
        <NoDataState />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 pt-16">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <ReportsDateFilter dateRange={dateRange} setDateRange={setDateRange} />
      </div>

      {/* Error Message */}
      <ErrorAlert error={error} onClose={resetMessages} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ExpensesPieChart
          data={expensesByCategory}
          formatCurrency={formatCurrency}
        />
        <MonthlyTrendsChart
          data={monthlyTrends}
          formatCurrency={formatCurrency}
        />
        <TopExpensesChart data={topExpenses} formatCurrency={formatCurrency} />
      </div>

      {/* Daily Expenses and Income vs Expenses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <IncomeVsExpensesChart
          data={monthlyTrends}
          formatCurrency={formatCurrency}
        />
        <PaymentMethodPieChart
          data={paymentMethods}
          formatCurrency={formatCurrency}
        />
      </div>
    </div>
  );
};

export default Analytics;
