"use client";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const AuthLoadingScreen = ({ text = "Loading..." }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <LoadingSpinner size="12" color="blue" />
      <p className="text-gray-600 mt-4">{text}</p>
    </div>
  </div>
);

export default AuthLoadingScreen;
