"use client"

import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const ExpensesPieChart = ({ data, formatCurrency }) => {
  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.category}</p>
          <p className="text-sm text-gray-600">{formatCurrency(data.amount)}</p>
          <p className="text-sm text-gray-600">{data.percentage}% of total</p>
        </div>
      )
    }
    return null
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border p-6 w-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Expenses by Category</h3>
        <div className="h-80 flex items-center justify-center text-gray-500">No expense data available</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md border p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Expenses by Category</h3>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={2} dataKey="amount">
              {data.map((entry) => (
                <Cell key={`cell-${entry.category}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<PieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((item) => (
          <div key={item.category} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm text-gray-600 truncate">{item.category}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExpensesPieChart
