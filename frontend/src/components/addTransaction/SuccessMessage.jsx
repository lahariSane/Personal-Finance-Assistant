"use client"
import React from "react";
const SuccessMessage = ({ message }) => (
  <div className="p-4 bg-green-50 border-b border-green-200">
    <div className="flex items-center space-x-2 text-green-800">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span>{message}</span>
    </div>
  </div>
)

export default SuccessMessage