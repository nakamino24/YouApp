// Generic API Response Type
export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
}
  
// Input Data for Register
export interface AuthData {
    email: string;
    password: string;
}
  
// Specific Response for Register API
export interface RegisterResponse {
    id: number;
    email: string;
    token: string;
}
  
  
// Response for Login API
export interface LoginResponse {
    token: string;
    user: {
      id: number;
      email: string;
    };
}
  
// User Profile Data
export interface ProfileData {
    id: number;
    name: string;
    email: string;
    bio?: string;
    interests?: string[];
    birthday?: string; 
    horoscope?: string;
    zodiac?: string;   
    height?: number;   
    weight?: number;   
}
  
// Input Data for Updating Profile
export interface UpdateProfileData {
    name: string;
    email: string;
    bio?: string;
    interests?: string[];
    birthday?: string; 
    horoscope?: string;   
    zodiac?: string;   
    height?: number;   
    weight?: number;
}
  