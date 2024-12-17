"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { EyeOpenIcon, EyeClosedIcon } from "../../../components/icons/EyeIcon";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

        <div className="relative">
          <Input
            placeholder="********"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-2/4 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        </div>

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
