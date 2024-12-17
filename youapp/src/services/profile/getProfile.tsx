import { ApiResponse, ProfileData } from "../../types/apiTypes";

export default async function getProfile(token: string): Promise<ApiResponse<ProfileData>> {
  const response = await fetch("/api/proxy-profile", {
    method: "GET",
    headers: { "x-access-token": token },
  });

  return response.json();
}
