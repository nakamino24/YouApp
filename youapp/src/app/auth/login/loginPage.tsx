"use client";

import { useState } from "react";
import login from "../../../services/auth/login";
import FormInput from "../../../components/FormInput";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async () => {
    const response = await login({ email, password });
    if (response.success) {
      setSuccess("Login successful!");
      setError("");
    } else {
      setError(response.message || "Failed to login.");
      setSuccess("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <FormInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <FormInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
      >
        Login
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
}
