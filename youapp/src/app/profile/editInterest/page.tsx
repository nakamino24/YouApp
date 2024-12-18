"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import updateProfile from "@/services/profile/updateProfile";

export default function EditInterestPage() {
  const [interests, setInterests] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Load existing interests from localStorage
  useEffect(() => {
    const profileData = JSON.parse(localStorage.getItem("profile") || "{}");
    setInterests(profileData.interests ? profileData.interests.split(", ") : []);
  }, []);

  // Add new interest when pressing Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!interests.includes(inputValue.trim())) {
        setInterests([...interests, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  // Remove interest
  const handleRemoveInterest = (index: number) => {
    const newInterests = interests.filter((_, i) => i !== index);
    setInterests(newInterests);
  };

  // Save interests
  const handleSave = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please login again.");
      setLoading(false);
      return;
    }

    const updatedData = { interests: interests.join(", ") };

    try {
      const response = await updateProfile(token, updatedData);
      if (response.success) {
        localStorage.setItem("profile", JSON.stringify({ ...updatedData }));
        router.push("/profile/getProfile");
      } else {
        setError(response.message || "Failed to update interests.");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
          {"< Back"}
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className="text-blue-400 hover:text-blue-500 font-semibold"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      {/* Title */}
      <h1 className="text-lg font-bold mb-2 text-gray-200">Tell everyone about yourself</h1>
      <p className="text-gray-400 mb-4">What interest you?</p>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Type and press Enter..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Tags Section */}
      <div className="flex flex-wrap gap-2 mt-4">
        {interests.map((interest, index) => (
          <div
            key={index}
            className="flex items-center px-3 py-1 bg-gray-700 text-white rounded-full space-x-2"
          >
            <span>{interest}</span>
            <button
              onClick={() => handleRemoveInterest(index)}
              className="text-gray-400 hover:text-red-400"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
