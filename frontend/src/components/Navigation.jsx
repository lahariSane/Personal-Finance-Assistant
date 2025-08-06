import React from "react"
import { Link, useLocation } from "react-router-dom"
import useAuthStore from "../store/authStore"

// Reusable navigation link item
const NavLinkItem = ({ to, children }) => {
  const location = useLocation()
  const isActive = location.pathname === to
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? "bg-blue-100 text-blue-700"
          : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  )
}

// Quick action button 
const QuickActionButton = ({ to, children }) => (
  <Link
    to={to}
    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
  >
    {children}
  </Link>
)

const handleLogout = () => {
  // Call the logout function from the auth store
  useAuthStore.getState().logout()
  navigate("/login") 
}

// Mobile menu button
const MobileMenuButton = () => (
  <button className="text-gray-700 hover:text-blue-600">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
)

const Navigation = () => {
  return (
    <nav className="bg-white shadow-lg border-b fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
              MyWallet
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <NavLinkItem to="/dashboard">Dashboard</NavLinkItem>
            <NavLinkItem to="/transactions">Transactions</NavLinkItem>
            <NavLinkItem to="/analytics">Analytics</NavLinkItem>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-4">
            <QuickActionButton to="/add-transaction">Add Transaction</QuickActionButton>
            <Link className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors" onClick={handleLogout}>
              Logout
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileMenuButton />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
