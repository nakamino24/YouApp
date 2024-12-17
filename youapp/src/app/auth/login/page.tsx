"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { EyeOpenIcon, EyeClosedIcon } from "../../../components/icons/EyeIcon";
import login from "../../../services/auth/login"; // Service untuk login

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const response = await login({ email, password });
    if (response.success && response.data) {
      localStorage.setItem("token", response.data.token);
      router.push("/profile/getProfile");
    } else {
      setError(response.message || "Invalid email or password.");
    }

    setLoading(false);
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

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
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

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          text={loading ? "Logging in..." : "Login"}
          onClick={handleLogin}
          variant="gradient"
          disabled={loading}
        />
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