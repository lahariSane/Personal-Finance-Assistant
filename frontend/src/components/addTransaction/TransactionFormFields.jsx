"use client"

import React from "react";
import { expenseCategories, incomeCategories, paymentMethods, frequencies } from "../../constants/transaction"

const TransactionFormFields = ({ formData, activeTab, onChange }) => {
  const getInputClasses = (activeTab) => {
    return `block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
      activeTab === "expense"
        ? "border-gray-300 focus:ring-red-500 focus:border-red-500"
        : "border-gray-300 focus:ring-green-500 focus:border-green-500"
    }`
  }

  const getCheckboxClasses = (activeTab) => {
    return `h-4 w-4 border-gray-300 rounded ${
      activeTab === "expense" ? "text-red-600 focus:ring-red-500" : "text-green-600 focus:ring-green-500"
    }`
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Amount *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">₹</span>
            </div>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={onChange}
              step="0.01"
              min="0"
              required
              className={`${getInputClasses(activeTab)} pl-7`}
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Date *
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={onChange}
            required
            className={getInputClasses(activeTab)}
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={onChange}
          required
          className={getInputClasses(activeTab)}
          placeholder={`Enter ${activeTab} description`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={onChange}
            required
            className={getInputClasses(activeTab)}
          >
            <option value="">Select a category</option>
            {(activeTab === "expense" ? expenseCategories : incomeCategories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Method */}
        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={onChange}
            className={getInputClasses(activeTab)}
          >
            <option value="">Select payment method</option>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={onChange}
          className={getInputClasses(activeTab)}
          placeholder="Enter tags separated by commas (e.g., work, urgent, monthly)"
        />
        <p className="text-xs text-gray-500 mt-1">Separate multiple tags with commas</p>
      </div>

      {/* Recurring Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-3 mb-4">
          <input
            type="checkbox"
            id="recurring"
            name="recurring"
            checked={formData.recurring}
            onChange={onChange}
            className={getCheckboxClasses(activeTab)}
          />
          <label htmlFor="recurring" className="text-sm font-medium text-gray-700">
            This is a recurring {activeTab}
          </label>
        </div>
        {formData.recurring && (
          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-2">
              Frequency
            </label>
            <select
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={onChange}
              className={getInputClasses(activeTab)}
            >
              <option value="">Select frequency</option>
              {frequencies.map((freq) => (
                <option key={freq} value={freq}>
                  {freq}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={onChange}
          rows={3}
          className={getInputClasses(activeTab)}
          placeholder="Add any additional notes..."
        />
      </div>
    </div>
  )
}

export default TransactionFormFields