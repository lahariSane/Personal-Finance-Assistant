"use client"
import React from "react";
const TransactionTabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b">
      <nav className="flex">
        <button
          onClick={() => onTabChange("expense")}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
            activeTab === "expense"
              ? "text-red-600 border-b-2 border-red-600 bg-red-50"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
            <span>Expense</span>
          </div>
        </button>
        <button
          onClick={() => onTabChange("income")}
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
            activeTab === "income"
              ? "text-green-600 border-b-2 border-green-600 bg-green-50"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
            <span>Income</span>
          </div>
        </button>
      </nav>
    </div>
  )
}

export default TransactionTabNavigation