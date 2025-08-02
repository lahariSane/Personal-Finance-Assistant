"use client"

import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts"

const COLORS = ["#EF4444", "#F97316", "#FACC15", "#10B981", "#3B82F6"]

const TopExpensesChart = ({ data, formatCurrency }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0]
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{item.payload.category}</p>
          <p className="text-sm text-gray-700">{`Amount: ${formatCurrency(item.value)}`}</p>
        </div>
      )
    }
    return null
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border px-2 py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top 5 Expenses</h3>
        <div className="h-80 flex items-center justify-center text-gray-500">No expense data available</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md border px-2 py-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Top 5 Expenses</h3>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tickFormatter={(value) => `₹${value}`} />
            <YAxis
              dataKey="category"
              type="category"
              tick={{ fill: "#4B5563", fontSize: 10 }}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default TopExpensesChart
