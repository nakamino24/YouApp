"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PencilIcon } from "@heroicons/react/24/outline";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { getHoroscope, getZodiac } from "@/utils/dateUtils";

interface Profile {
  name: string;
  age: number;
  gender: string;
  birthday: string;
  horoscope: string;
  zodiac: string;
  height: number;
  weight: number;
  interests: string[];
  profileImage: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditingAbout, setIsEditingAbout] = useState<boolean>(false);
  const [formAbout, setFormAbout] = useState<Partial<Profile>>({});
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch profile data
  const fetchProfile = async () => {
    setLoading(true);
    const response = await fetch("/api/profile", {
      method: "GET",
      headers: { "x-access-token": "mock-token-12345" },
    });
    const data = await response.json();
    if (data.success) {
      setProfile({
        name: data.data.name || "johndoe123",
        age: data.data.age || 28,
        gender: data.data.gender || "Male",
        birthday: data.data.birthday || "28 / 08 / 1995",
        horoscope: data.data.horoscope || "Virgo",
        zodiac: data.data.zodiac || "Pig",
        height: data.data.height || 175,
        weight: data.data.weight || 69,
        interests: data.data.interests || ["Music", "Basketball", "Fitness"],
        profileImage:
          data.data.profileImage ||
          "https://via.placeholder.com/400x200.png?text=Profile+Header",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle Edit
  const handleEditAbout = () => {
    setIsEditingAbout(true);
    setFormAbout(profile);
  };

  // Handle Change
  const handleChange = (field: keyof Profile, value: string) => {
    const updatedForm = { ...formAbout, [field]: value };

    if (field === "birthday") {
      const [day, month, year] = value.split(" ").map(Number);
      updatedForm.horoscope = getHoroscope(day, month - 1);
      updatedForm.zodiac = getZodiac(year);
    }

    setFormAbout(updatedForm);
  };

  // Save About
  const handleSaveAbout = async () => {
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-access-token": "mock-token-12345" },
      body: JSON.stringify(formAbout),
    });
    const result = await response.json();
    if (result.success) {
      setProfile(formAbout);
      setIsEditingAbout(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : (
        <>
          {/* Header Section */}
          <div className="relative mb-6 w-full h-48">
            <Image
              src={profile?.profileImage || ""}
              alt="Profile Header"
              layout="fill"
              objectFit="cover"
              priority
              className="rounded-b-lg"
            />
            <div className="absolute bottom-4 left-4">
              <h1 className="text-xl font-bold">@{profile?.name}</h1>
              <p className="text-gray-300">
                {profile?.gender}, {profile?.age}
              </p>
              <div className="flex space-x-2 mt-1">
                <span className="px-2 py-1 bg-gray-700 text-xs rounded">{profile?.horoscope}</span>
                <span className="px-2 py-1 bg-gray-700 text-xs rounded">{profile?.zodiac}</span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-gray-800 p-4 rounded-lg mb-4 relative">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-gray-400 text-sm">About</h2>
              {!isEditingAbout && (
                <button onClick={handleEditAbout} className="text-gray-400 hover:text-white">
                  <PencilIcon className="w-5 h-5" />
                </button>
              )}
            </div>

            {isEditingAbout ? (
              <div className="space-y-2">
                <Input
                  label="Birthday"
                  type="text"
                  value={formAbout.birthday}
                  onChange={(e) => handleChange("birthday", e.target.value)}
                />
                <Input label="Horoscope" type="text" value={formAbout.horoscope} readOnly />
                <Input label="Zodiac" type="text" value={formAbout.zodiac} readOnly />
                <Input
                  label="Height"
                  type="number"
                  value={formAbout.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                />
                <Input
                  label="Weight"
                  type="number"
                  value={formAbout.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                />
                <Button label="Save & Update" onClick={handleSaveAbout} />
              </div>
            ) : (
              <>
                <p className="text-gray-300">Birthday: {profile?.birthday}</p>
                <p className="text-gray-300">Horoscope: {profile?.horoscope}</p>
                <p className="text-gray-300">Zodiac: {profile?.zodiac}</p>
                <p className="text-gray-300">Height: {profile?.height} cm</p>
                <p className="text-gray-300">Weight: {profile?.weight} kg</p>
              </>
            )}
          </div>

          {/* Interests Section */}
          <div className="bg-gray-800 p-4 rounded-lg relative">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-gray-400 text-sm">Interest</h2>
              <button className="text-gray-400 hover:text-white">
                <PencilIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile?.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700 text-sm rounded-full text-gray-300"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
