import { ApiResponse } from "@/types/apiTypes";

export interface ProfileData {
  name: string;
  email: string;
  birthday: string;
  gender:string;
  horoscope: string;
  zodiac: string;
  height: number;
  weight: number;
  interests: string[];
  image: string; 
}

export default async function getProfile(token: string): Promise<ApiResponse<ProfileData>> {
  const response = await fetch("/api/proxy-profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token, 
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile data.");
  }

  return response.json();
}
