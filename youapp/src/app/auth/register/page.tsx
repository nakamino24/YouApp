"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import register from "../../../services/auth/register";

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
      router.push("/auth/login");
    } else {
      setError(response.message || "Failed to register.");
      setSuccess("");
    }
  };

  const handleBack = () => {
    router.push("/"); 
  };

  return (
    <Layout>
      {/* Back Button */}
      <button onClick={handleBack} className="text-gray-400 hover:text-white mb-6">
        {"<"} Back
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold text-white mb-6 text-center">Register</h1>

      {/* Form Inputs */}
      <div className="space-y-4">
        <Input
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Create Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Create Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button text="Register" onClick={handleRegister} variant="gradient" />
      </div>

      {/* Success and Error Messages */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}

      {/* Login Redirect */}
      <p className="text-gray-400 text-center mt-6">
        Have an account?{" "}
        <a href="/auth/login" className="text-blue-400 hover:underline">
          Login here
        </a>
      </p>
    </Layout>
  );
}
