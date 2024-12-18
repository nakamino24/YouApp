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
      <div className="relative w-full h-56 bg-gray-700 rounded-b-lg overflow-hidden">
        {profile.image && (
          <Image
            src={profile.image}
            alt="Profile Cover"
            layout="fill"
            objectFit="cover"
            priority
          />
        )}
        {/* Overlay Content */}
        <div className="absolute bottom-4 left-4">
          <h2 className="text-xl font-bold">{profile.name || "No name available"}</h2>
          <p className="text-gray-300">{profile.gender}</p>
          <div className="flex space-x-2 mt-1">
            <HoroscopeIcon sign={profile.horoscope || ""} className="text-blue-400" />
            <span className="px-2 py-1 bg-gray-800 rounded-full text-sm">{profile.horoscope}</span>
            <ZodiacIcon sign={profile.zodiac || ""} className="text-yellow-400" />
            <span className="px-2 py-1 bg-gray-800 rounded-full text-sm">{profile.zodiac}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* About Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-4 flex justify-between">
          <div>
            <h3 className="text-md font-semibold mb-1">About</h3>
            <p className="text-gray-400">
              <span className="font-semibold text-white">Birthday:</span> {profile.birthday}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold text-white">Horoscope:</span> {profile.horoscope}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold text-white">Zodiac:</span> {profile.zodiac}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold text-white">Height:</span> {profile.height}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold text-white">Weight:</span> {profile.weight}
            </p>
          </div>
          <button
            onClick={() => router.push("/profile/editAbout")}
            className="text-gray-400 hover:text-white"
          >
            <PencilIcon />
          </button>
        </div>

        {/* Interests Section */}
        <div className="bg-gray-800 rounded-lg p-6 flex justify-between">
          <div>
            <h3 className="text-md font-semibold mb-1">Interests</h3>
            <p className="text-gray-400">{profile.interests}</p>
          </div>
          <button className="text-gray-400 hover:text-white">
            <PencilIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
