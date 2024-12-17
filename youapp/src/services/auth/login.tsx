import { ApiResponse } from "../../types/apiTypes";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export default async function login(data: LoginData): Promise<ApiResponse<LoginResponse>> {
  const response = await fetch("/api/proxy-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response.json();
}
