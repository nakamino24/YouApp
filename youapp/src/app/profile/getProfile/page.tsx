"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PencilIcon from "../../../components/icons/PencilIcon";
import getProfile from "../../../services/profile/getProfile";

interface ProfileData {
  username: string;
  name: string;
  about: string;
  interests: string;
}

export default function GetProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    username: "",
    name: "",
    about: "",
    interests: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  // Fetch Profile Data
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
          name: response.data.name,
          about: response.data.bio || "No bio available.",
          interests: response.data.interests?.join(", ") || "No interests available.",
        });
      } else {
        setError(response.message || "Failed to fetch profile data.");
      }
    };

    fetchProfile();
  }, [router]);

  // Handle Back Navigation
  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleBack} className="text-gray-400 hover:text-white">
            {"<"} Back
          </button>
          <h1 className="text-xl font-bold">{profile.name || "Loading..."}</h1>
          <button className="text-gray-400 hover:text-white">
            <PencilIcon />
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Profile Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-4">
          <h2 className="text-lg font-semibold mb-2">{profile.username || "Loading..."}</h2>
        </div>

        {/* About Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-4 flex justify-between">
          <div>
            <h3 className="text-md font-semibold mb-1">About</h3>
            <p className="text-gray-400">{profile.about}</p>
          </div>
          <button className="text-gray-400 hover:text-white">
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
