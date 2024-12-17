"use client";

import { useState } from "react";
import Layout from "../../../components/layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login with", { email, password });
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
      <p className="text-gray-500 text-center mb-8">
        Please enter your credentials to login.
      </p>

      <form className="space-y-6">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button text="Login" onClick={handleLogin} />

        <p className="text-sm text-gray-600 text-center mt-4">
          Don’t have an account?{" "}
          <a href="/auth/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </p>
      </form>
    </Layout>
  );
}
