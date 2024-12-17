"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import register from "../../../services/auth/register";
import Input from "../../../components/Input"; // Import komponen Input

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setSuccess("");
      return;
    }

    const response = await register({ email, password });
    if (response.success) {
      setSuccess("Registration successful!");
      setError("");

      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      router.push("/profile/getProfile");
    } else {
      setError(response.message || "Failed to register.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Card Container */}
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6">Create an Account</h1>
        <p className="text-gray-400 text-center mb-6">
          Join us to explore the full experience.
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Username"
            type="text"
            placeholder="yourusername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleRegister}
            className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-400 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
