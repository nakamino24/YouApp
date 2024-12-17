// Types for Login and Register Inputs
export interface AuthData {
    email: string;
    password: string;
}

// Type for API Response
export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
}  

// Type for User Profile Data
export interface ProfileData {
    id: string;
    name: string;
    email: string;
    interests?: string[];
}

// Type for Update Profile Input
export interface UpdateProfileData {
    name?: string;
    interests?: string[];
}
  