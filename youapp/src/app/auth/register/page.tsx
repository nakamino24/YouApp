"use client";

import { useState } from "react";
import register from "../../../services/auth/register";
import FormInput from "../../../components/Input";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    const response = await register({ email, password });
    if (response.success) {
      setSuccess("Registration successful!");
      setError("");
    } else {
      setError(response.message || "Failed to register.");
      setSuccess("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <FormInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <FormInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleRegister}
        className="mt-4 bg-green-500 text-white p-2 rounded w-full"
      >
        Register
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
}
