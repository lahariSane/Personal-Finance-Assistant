import React, { useState } from "react"

const EmailPasswordLoginForm = ({ onSubmit, loading }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-black">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-black">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  )
}

export default EmailPasswordLoginForm
