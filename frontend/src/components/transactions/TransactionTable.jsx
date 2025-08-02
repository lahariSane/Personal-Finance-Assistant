"use client";
import React from "react";
import { Link } from "react-router-dom";

const TransactionTable = ({
  transactions,
  loading,
  selectedTransactions,
  onSelectTransaction,
  onSelectAll,
  onEditTransaction,
  onDeleteSelected,
  sortBy,
  sortOrder,
  onSort,
  currentPage,
  itemsPerPage,
  totalTransactions,
}) => {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get current page transactions
  const getCurrentPageTransactions = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return transactions.slice(startIndex, endIndex);
  };

  const currentPageTransactions = getCurrentPageTransactions();

  // Handle sort click
  const handleSortClick = (field) => {
    console.log("Sort clicked:", field);
    onSort(field);
  };

  // Handle select all
  const handleSelectAll = () => {
    const currentPageIds = currentPageTransactions.map((t) => t._id);
    onSelectAll(currentPageIds);
  };

  // Handle individual selection
  const handleSelectTransaction = (transactionId) => {
    onSelectTransaction(transactionId);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-8 text-center">
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="text-gray-600 mb-4">
            {totalTransactions === 0
              ? "No transactions found"
              : "No transactions match your date filter"}
          </p>
          {totalTransactions === 0 && (
            <Link
              to="/add-transaction"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Transaction
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Table Header */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Transactions ({transactions.length})
          </h3>
          {selectedTransactions.length > 0 && (
            <button
              type="button"
              onClick={onDeleteSelected}
              className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Selected ({selectedTransactions.length})
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedTransactions.length ===
                      currentPageTransactions.length &&
                    currentPageTransactions.length > 0
                  }
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSortClick("date")}
              >
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  {sortBy === "date" && (
                    <svg
                      className={`w-4 h-4 ${
                        sortOrder === "asc" ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSortClick("description")}
              >
                <div className="flex items-center space-x-1">
                  <span>Description</span>
                  {sortBy === "description" && (
                    <svg
                      className={`w-4 h-4 ${
                        sortOrder === "asc" ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSortClick("category")}
              >
                <div className="flex items-center space-x-1">
                  <span>Category</span>
                  {sortBy === "category" && (
                    <svg
                      className={`w-4 h-4 ${
                        sortOrder === "asc" ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSortClick("amount")}
              >
                <div className="flex items-center space-x-1">
                  <span>Amount</span>
                  {sortBy === "amount" && (
                    <svg
                      className={`w-4 h-4 ${
                        sortOrder === "asc" ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentPageTransactions.map((transaction) => (
              <tr key={transaction._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedTransactions.includes(transaction._id)}
                    onChange={() => handleSelectTransaction(transaction._id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(transaction.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div>
                    <div className="font-medium">{transaction.description}</div>
                    {transaction.notes && (
                      <div className="text-gray-500 text-xs mt-1">
                        {transaction.notes}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span
                    className={
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.paymentMethod || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    type="button"
                    onClick={() => onEditTransaction(transaction)}
                    className="mr-4 text-blue-600 hover:text-blue-900"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectTransaction(transaction._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
