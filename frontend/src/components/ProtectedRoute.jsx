"use client"

import useAuthStore from "../store/authStore"
import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import Navigation from "./Navigation"

const ProtectedRoute = ({ children }) => {
  const { user, loading, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <Navigation />
      {children}
    </>
  )
}

export default ProtectedRoute
