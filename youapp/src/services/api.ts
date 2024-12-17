import { ApiResponse, ProfileData, AuthData, UpdateProfileData } from "../types/apiTypes";

const BASE_URL = "http://techtest.youapp.ai/api";

export const login = async (data: AuthData): Promise<ApiResponse> => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const register = async (data: AuthData): Promise<ApiResponse> => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getProfile = async (token: string): Promise<ApiResponse<ProfileData>> => {
  const response = await fetch(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};

export const updateProfile = async (
  token: string,
  data: UpdateProfileData
): Promise<ApiResponse<ProfileData>> => {
  const response = await fetch(`${BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};