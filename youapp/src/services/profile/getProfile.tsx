import { ApiResponse, ProfileData } from "../../types/apiTypes";

export default async function getProfile(
  token: string
): Promise<ApiResponse<ProfileData>> {
  const BASE_URL = "http://techtest.youapp.ai/api";
  const response = await fetch(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}
