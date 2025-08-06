"use client"

import React from "react"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const PaymentMethodPieChart = ({ data, formatCurrency }) => {
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const entry = payload[0]
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{entry.name}</p>
          <p className="text-sm" style={{ color: entry.color }}>
            {formatCurrency(entry.value)}
          </p>
        </div>
      )
    }
    return null
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border p-6 w-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Method Distribution</h3>
        <div className="h-80 flex items-center justify-center text-gray-500">No payment data available</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md border p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Payment Method Distribution</h3>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="method"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PaymentMethodPieChart
