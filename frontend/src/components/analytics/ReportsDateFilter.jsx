"use client"

import React from "react"

const ReportsDateFilter = ({
  dateRange,
  setDateRange,
}) => {
  return (
    <div className="flex space-x-4">
      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="thisMonth">This Month</option>
        <option value="lastMonth">Last Month</option>
        <option value="thisYear">This Year</option>
        <option value="overall">Overall</option>
      </select>
    </div>
  )
}

export default ReportsDateFilter
