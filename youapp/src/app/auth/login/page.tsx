"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter(); 

  const handleLogin = () => {
    console.log("Login with", { email, password });
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

      <h1 className="text-3xl font-bold text-white mb-6 text-center">Login</h1>

      <form className="space-y-4">
        <Input
          placeholder="Johndoe@gmail.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<span>👁️</span>}
        />

        <Button text="Login" onClick={handleLogin} variant="gradient" />
      </form>

      <p className="text-gray-400 text-center mt-6">
        No account?{" "}
        <a href="/auth/register" className="text-blue-400 hover:underline">
          Register here
        </a>
      </p>
    </Layout>
  );
}
