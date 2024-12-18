"use client";

import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { login } from "@/services/auth/login";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    const result = await login({ email, password });
    setLoading(false);

    if (result.success) {
      localStorage.setItem("token", result.data.token); // Simpan token
      router.push("/profile");
    } else {
      setError(result.message || "Failed to login.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="p-6 bg-gray-800 rounded-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">
          Login
        </h1>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          label="Login"
          onClick={handleLogin}
          isLoading={loading}
          disabled={loading}
        />
      </div>
    </div>
  );
}
