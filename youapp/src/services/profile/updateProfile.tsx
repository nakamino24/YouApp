import { ApiResponse } from "../../types/apiTypes";

interface UpdateProfileData {
  name?: string;
  gender?: string;
  birthday?: string;
  horoscope?: string;
  zodiac?: string;
  height?: number;
  weight?: number;
  interests: string;
}

export default async function updateProfile(
  token: string,
  data: UpdateProfileData
): Promise<ApiResponse> {
  const response = await fetch("/api/proxy-profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
