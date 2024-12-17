"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../../components/Layout";
import Input from "../../../components/Input";

export default function ProfilePage() {
  const router = useRouter();
  const [username, setUsername] = useState("@johndoe123");
  const [about, setAbout] = useState("");
  const [interests, setInterests] = useState("");

  const handleBack = () => {
    router.push("/"); // Navigasi ke Home
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={handleBack} className="text-gray-400 hover:text-white">
          {"<"} Back
        </button>
        <h1 className="text-lg font-semibold text-center text-white">@johndoe</h1>
        <div className="w-6"></div> {/* Placeholder */}
      </div>

      {/* Profile Section */}
      <div className="space-y-4">
        {/* Profile Box */}
        <div className="p-4 bg-gray-800 rounded-lg relative">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="absolute top-4 right-4">
            <span className="bg-blue-500 text-white font-semibold rounded-full p-2">
              V
            </span>
          </div>
        </div>

        {/* About Section */}
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-sm text-gray-400 mb-2">About</h2>
          <Input
            placeholder="Add in your bio to help others know you better"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        {/* Interest Section */}
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-sm text-gray-400 mb-2">Interest</h2>
          <Input
            placeholder="Add in your interest to find a better match"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />
        </div>
      </div>
    </Layout>
  );
}
