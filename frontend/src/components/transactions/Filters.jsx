"use client"

import React from "react"

const Filters = ({
  filters,
  onFilterChange,
  onClearFilters,
  filteredCount,
  categories = [],
  paymentMethods = [],
  sortOptions
}) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Clear Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date From */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onFilterChange("dateFrom", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onFilterChange("dateTo", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange("type", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
          <select
            value={filters.paymentMethod}
            onChange={(e) => onFilterChange("paymentMethod", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All</option>
            {paymentMethods.map((method, idx) => (
              <option key={idx} value={method}>{method}</option>
            ))}
          </select>
        </div>

        {/* sort by */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Sort by Date</label>
          <select
            value={filters.sort || "desc"}
            onChange={(e) => onFilterChange("sort", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            {sortOptions.map((option, idx) => (
              <option key={idx} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {(filters.dateFrom || filters.dateTo || filters.category || filters.type || filters.paymentMethod) && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-blue-800">
              <span className="font-medium">Active Filters:</span>
              <span>
                {filters.dateFrom && ` From ${formatDate(filters.dateFrom)} `}
                {filters.dateTo && ` To ${formatDate(filters.dateTo)} `}
                {filters.category && ` | Category: ${filters.category}`}
                {filters.type && ` | Type: ${filters.type}`}
                {filters.paymentMethod && ` | Payment: ${filters.paymentMethod}`}
              </span>
            </div>
            <span className="text-sm text-blue-600">{filteredCount} transaction(s) found</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Filters
