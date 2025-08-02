"use client"
import React from "react";
import { Link } from "react-router-dom"

const AuthNavigation = ({ primaryText, primaryLink, primaryLinkText, showHomeLink = true }) => (
  <div className="space-y-4 pt-4 border-t border-gray-200">
    <div className="text-center text-sm text-gray-600">
      {primaryText}{" "}
      <Link to={primaryLink} className="font-medium text-blue-600 hover:text-blue-500 underline">
        {primaryLinkText}
      </Link>
    </div>

    {showHomeLink && (
      <div className="text-center">
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 underline">
          ← Back to Home
        </Link>
      </div>
    )}
  </div>
)

export default AuthNavigation
