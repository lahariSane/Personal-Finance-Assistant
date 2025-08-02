"use client"
import React from "react";
import LoadingSpinner from "../LoadingSpinner"

const TransactionFormActions = ({ activeTab, loading, onReset, onSubmit }) => {
  return (
    <div className="flex justify-end space-x-4 pt-6 border-t">
      <button
        type="button"
        onClick={onReset}
        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        disabled={loading}
      >
        Reset
      </button>
      <button
        type="submit"
        disabled={loading}
        className={`px-6 py-3 rounded-lg text-white font-medium transition-colors ${
          activeTab === "expense"
            ? "bg-red-600 hover:bg-red-700 disabled:bg-red-400"
            : "bg-green-600 hover:bg-green-700 disabled:bg-green-400"
        } ${loading ? "cursor-not-allowed" : ""}`}
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <LoadingSpinner color="white" />
            <span>Adding...</span>
          </div>
        ) : (
          `Add ${activeTab === "expense" ? "Expense" : "Income"}`
        )}
      </button>
    </div>
  )
}

export default TransactionFormActions