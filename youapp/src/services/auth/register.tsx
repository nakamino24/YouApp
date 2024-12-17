import { AuthData, ApiResponse } from "../../types/apiTypes";

export default async function register(data: AuthData): Promise<ApiResponse> {
  const BASE_URL = "http://techtest.youapp.ai/api";
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}
