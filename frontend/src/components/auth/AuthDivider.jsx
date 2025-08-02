"use client"
import React from "react";
const AuthDivider = ({ text }) => (
  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t border-gray-300" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-gray-50 px-2 text-gray-500">{text}</span>
    </div>
  </div>
)

export default AuthDivider
