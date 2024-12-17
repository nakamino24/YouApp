import { ApiResponse, UpdateProfileData, ProfileData } from "../../types/apiTypes";

export default async function updateProfile(
  token: string,
  data: UpdateProfileData
): Promise<ApiResponse<ProfileData>> {
  const BASE_URL = "http://techtest.youapp.ai/api";
  const response = await fetch(`${BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
