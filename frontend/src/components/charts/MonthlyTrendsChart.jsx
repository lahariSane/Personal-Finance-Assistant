"use client"

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const MonthlyTrendsChart = ({ data, formatCurrency }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Trends</h3>
        <div className="h-80 flex items-center justify-center text-gray-500">No monthly data available</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md border p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" tickFormatter={(value) => `₹${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
              name="Income"
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
              name="Expenses"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default MonthlyTrendsChart
