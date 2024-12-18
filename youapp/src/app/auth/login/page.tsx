"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import login from "@/services/auth/login";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await login({ email, password });
      console.log("Login Response:", response); 

      if (response.success && response.data) {
        localStorage.setItem("token", response.data.token); 
        router.push("/profile/getProfile"); 
      } else {
        setError(response.message || "Invalid email or password.");
      }
    } catch  {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <Layout>
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="text-gray-400 hover:text-white mb-6 flex items-center"
      >
        <svg
          className="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <span>Back</span>
      </button>

      {/* Header */}
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Welcome Back!</h1>
      <p className="text-gray-400 text-center mb-6">Please login to your account</p>

      {/* Form */}
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Login Button */}
        <Button
          label={loading ? "Logging in..." : "Login"}
          onClick={handleLogin}
          isLoading={loading}
          disabled={loading}
        />
      </form>
    </Layout>
  );
}
