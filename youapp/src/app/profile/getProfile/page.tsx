"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import getProfile from "../../../services/profile/getProfile";
import PencilIcon from "../../../components/icons/PencilIcon";
import HoroscopeIcon from "@/components/icons/HoroscopeIcons";
import ZodiacIcon from "@/components/icons/ZodiacIcons";

interface ProfileData {
  username: string;
  name: string;
  image?: string;
  gender?: string;
  birthday?: string;
  horoscope?: string;
  zodiac?: string;
  height?: string;
  weight?: string;
  interests: string;
}

export default function GetProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    username: "",
    name: "",
    image: "",
    gender: "",
    birthday: "",
    horoscope: "",
    zodiac: "",
    height: "",
    weight: "",
    interests: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const calculateAge = (birthdate: string): number | null => {
    if (!birthdate || birthdate === "N/A") return null;
    const birthDate = new Date(birthdate);
    const today = new Date();
    return today.getFullYear() - birthDate.getFullYear() -
      (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/auth/login");
        return;
      }

      const response = await getProfile(token);

      if (response.success && response.data) {
        setProfile({
          username: `@${response.data.email.split("@")[0]}`,
          name: response.data.name || "No name available.",
          image: response.data.image || "/default-profile.png",
          gender: response.data.gender || "N/A",
          birthday: response.data.birthday || "N/A",
          horoscope: response.data.horoscope || "N/A",
          zodiac: response.data.zodiac || "N/A",
          height: response.data.height ? `${response.data.height} cm` : "N/A",
          weight: response.data.weight ? `${response.data.weight} kg` : "N/A",
          interests: response.data.interests?.join(", ") || "No interests available.",
        });
      } else {
        setError(response.message || "Failed to fetch profile data.");
      }
    };

    fetchProfile();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
  {/* Header */}
  <div className="relative w-full h-56 bg-gray-800 rounded-b-lg overflow-hidden">
    {profile.image && (
      <Image
        src={profile.image}
        alt="Profile Cover"
        layout="fill"
        objectFit="cover"
        priority
      />
    )}
    <div className="absolute bottom-4 left-4">
      <h2 className="text-xl font-bold">{profile.name || "No name available"}</h2>
      <p className="text-gray-300">{profile.gender}</p>
      <div className="flex items-center space-x-4 mt-2">
        {/* Horoscope */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800">
            <HoroscopeIcon sign={profile.horoscope || ""} className="text-blue-400 text-sm" />
          </div>
          <span className="text-sm font-medium">{profile.horoscope}</span>
        </div>
        {/* Zodiac */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800">
            <ZodiacIcon sign={profile.zodiac || ""} className="text-yellow-400 text-sm" />
          </div>
          <span className="text-sm font-medium">{profile.zodiac}</span>
        </div>
      </div>
    </div>
  </div>

  {/* Error Message */}
  {error && (
    <div className="text-center mt-4">
      <p className="text-red-500 font-semibold">{error}</p>
    </div>
  )}

  {/* Main Content */}
  <div className="max-w-4xl mx-auto p-6">
    {/* About Section */}
    <div className="bg-gray-800 rounded-lg p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">About</h3>
        <button
          onClick={() => router.push("/profile/editAbout")}
          className="text-gray-400 hover:text-white"
        >
          <PencilIcon />
        </button>
      </div>
      <div className="space-y-2 text-gray-400">
        <p>
          <span className="font-semibold text-white">Birthday:</span> {profile.birthday}{" "}
          {profile.birthday && (
            <span className="text-gray-300">(Age: {calculateAge(profile.birthday)})</span>
          )}
        </p>
        <p>
          <span className="font-semibold text-white">Horoscope:</span> {profile.horoscope}
        </p>
        <p>
          <span className="font-semibold text-white">Zodiac:</span> {profile.zodiac}
        </p>
        <p>
          <span className="font-semibold text-white">Height:</span> {profile.height}
        </p>
        <p>
          <span className="font-semibold text-white">Weight:</span> {profile.weight}
        </p>
      </div>
    </div>

    {/* Interests Section */}
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Interest</h3>
        <button onClick={() => router.push("/profile/editInterest")} className="text-gray-400 hover:text-white">
          <PencilIcon />
        </button>
      </div>
      <p className="text-gray-400">{profile.interests || "Add your interests to find a better match."}</p>
        </div>
      </div>
    </div>
  )
}