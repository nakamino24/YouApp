"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import updateProfile from "../../../services/profile/updateProfile";
import { calculateZodiac, calculateHoroscope } from "../../../utils/zodiacUtils";
import Input from "../../../components/Input";
import PencilIcon from "@/components/icons/PencilIcon";

export default function EditAboutPage() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [horoscope, setHoroscope] = useState("");
  const [zodiac, setZodiac] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [interests, setInterests] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  useEffect(() => {
    const profileData = JSON.parse(localStorage.getItem("profile") || "{}");
    setName(profileData.name || "");
    setGender(profileData.gender || "");
    setBirthday(profileData.birthday || "");
    setHoroscope(calculateHoroscope(profileData.birthday || ""));
    setZodiac(calculateZodiac(new Date(profileData.birthday).getFullYear()));
    setHeight(profileData.height || "");
    setWeight(profileData.weight || "");
    setInterests(profileData.interests || "");
    if (profileData.image) setImagePreview(profileData.image);
  }, []);

  const handleBirthdayChange = (value: string) => {
    setBirthday(value);
    setHoroscope(calculateHoroscope(value));
    setZodiac(calculateZodiac(new Date(value).getFullYear()));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      return result.url;
    } else {
      throw new Error("Failed to upload image");
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please login again.");
      return;
    }

    let uploadedImageUrl = imagePreview;

    try {
      if (image) {
        uploadedImageUrl = await uploadImage(image);
      }
    } catch {
      setError("Image upload failed.");
      return;
    }

    const updatedData = {
      name,
      gender,
      birthday,
      horoscope,
      zodiac,
      height: parseInt(height),
      weight: parseInt(weight),
      interests,
      image: uploadedImageUrl,
    };

    const response = await updateProfile(token, updatedData);

    if (response.success) {
      setSuccess("Profile updated successfully!");
      setError("");
      localStorage.setItem("profile", JSON.stringify(updatedData));
      router.push("/profile/getProfile");
    } else {
      setError(response.message || "Failed to update profile.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.push("/profile/getProfile")} className="text-gray-400 hover:text-white">
            {"<"} Back
          </button>
          <h1 className="text-xl font-bold">Edit About</h1>
          <button onClick={handleSave} className="text-blue-400 hover:text-blue-500">
            Save & Update
          </button>
        </div>

        {/* Image Upload Section */}
        <div className="flex items-center mb-4">
          <div className="relative w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              <Image src={imagePreview} alt="Profile" layout="fill" objectFit="cover" />
            ) : (
              <span className="text-gray-400">Add Image</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
          </div>
          <p className="ml-4 text-gray-400">Click to add or update your image</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <Input label="Display Name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Gender" placeholder="Enter gender" value={gender} onChange={(e) => setGender(e.target.value)} />
          <Input label="Birthday" type="date" value={birthday} onChange={(e) => handleBirthdayChange(e.target.value)} />
          <Input label="Horoscope" value={horoscope} readOnly />
          <Input label="Zodiac (Shio)" value={zodiac} readOnly />
          <Input label="Height (cm)" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
          <Input label="Weight (kg)" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <div className="relative mt-6 bg-gray-800 rounded-lg p-6">
          <div>
            <h3 className="text-md font-semibold mb-1">Interest</h3>
            <p className="text-gray-400">
              {interests || "Add in your interest to find a better match"}
            </p>
          </div>
          <button onClick={() => setInterests("")} className="absolute top-3 right-3 text-gray-400 hover:text-white">
            <PencilIcon />
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </div>
    </div>
  );
}
