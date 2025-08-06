"use client"

import React from "react";

const ErrorAlert = ({ error, onClose }) => {
  if (!error) return null

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2 text-red-800">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{error}</span>
        <button onClick={onClose} className="ml-auto text-red-600 hover:text-red-800">
          ×
        </button>
      </div>
    </div>
  )
}

export default ErrorAlert