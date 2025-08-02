import { create } from "zustand"
import axios from "../utils/axios"

const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: "",
  authLoading: false,

  // Check authentication status
  checkAuth: async (navigate) => {
    set({ loading: true })
    try {
      const response = await axios.get("/auth/me")
      set({ user: response.data, loading: false })
      if (navigate) navigate("/dashboard")
    } catch (error) {
      if (error.response?.status === 401) {
        set({ user: null, loading: false })
        if (navigate) navigate("/login")
      }
      else {
        console.error("Auth check failed:", error)
        set({
          user: null,
          loading: false,
          error: error.response?.data?.message || "Failed to check authentication",
        })
      }
    }
  },

  // Fetch current user (without navigation)
  fetchCurrentUser: async () => {
    set({ loading: true, error: "" })
    try {
      const response = await axios.get("/auth/me")
      set({ user: response.data, loading: false })
      return response.data
    } catch (error) {
      console.error("Failed to fetch current user:", error)
      set({
        user: null,
        loading: false,
        error: error.response?.data?.message || "Failed to fetch user data",
      })
      throw error
    }
  },

  // Sign up with email and password
  signupWithEmailPassword: async (name, email, password, navigate) => {
    set({ authLoading: true, error: "" })
    try {
      const response = await axios.post("/auth/register", { name, email, password })
      set({ user: response.data, authLoading: false })
      if (navigate) navigate("/dashboard")
    } catch (error) {
      console.error("Signup error:", error)
      set({
        error: error.response?.data?.message || "Signup failed. Please try again.",
        authLoading: false,
      })
    }
  },

  // Login with email and password
  loginWithEmailPassword: async (email, password, navigate) => {
    set({ authLoading: true, error: "" })
    try {
      const response = await axios.post("/auth/login", { email, password })
      set({ user: response.data, authLoading: false })
      if (navigate) navigate("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      set({
        error: error.response?.data?.message || "Login failed. Please try again.",
        authLoading: false,
      })
    }
  },

  // Google login
  loginWithGoogle: () => {
    set({ authLoading: true, error: "" })
    try {
      window.location.href = "http://localhost:5000/auth/google"
    } catch (error) {
      set({ error: "Failed to initiate Google login. Please try again.", authLoading: false })
    }
  },

  // Logout function
  logout: async () => {
    set({ loading: true })
    try {
      // Optional: Call logout endpoint on server
      await axios.get("/auth/logout")
      // Clear user data
      set({ user: null, loading: false })
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      set({ user: null, loading: false })
    }
  },

  // Clear error
  clearError: () => set({ error: "" }),

  // Set user manually (useful for login callbacks)
  setUser: (userData) => set({ user: userData, loading: false }),
}))

export default useAuthStore
