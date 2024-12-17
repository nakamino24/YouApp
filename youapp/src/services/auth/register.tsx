import { ApiResponse, AuthData, RegisterResponse } from "../../types/apiTypes";

export default async function register(data: AuthData): Promise<ApiResponse<RegisterResponse>> {
  const response = await fetch("/api/proxy-register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response.json();
}
