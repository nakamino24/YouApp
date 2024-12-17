import { AuthData, ApiResponse } from "../../types/apiTypes";

export default async function login(
  data: AuthData
): Promise<ApiResponse<{ token: string }>> {
  const BASE_URL = "http://techtest.youapp.ai/api";
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}