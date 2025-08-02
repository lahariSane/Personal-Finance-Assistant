import React, { useState } from "react";

const EmailPasswordRegisterForm = ({ onSubmit, loading }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    else onSubmit({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-black">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
        />
      </div>
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
        <label
          htmlFor="password"
          className="block text-sm font-medium text-black"
        >
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

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-black"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded bg-white text-black"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default EmailPasswordRegisterForm;