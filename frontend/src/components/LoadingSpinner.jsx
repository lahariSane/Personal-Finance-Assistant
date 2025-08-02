"use client"
import React from "react";
const LoadingSpinner = ({ color = "blue", size = "4" }) => (
  <div className={`animate-spin rounded-full h-${size} w-${size} border-b-2 border-${color}-600`}></div>
)

export default LoadingSpinner
