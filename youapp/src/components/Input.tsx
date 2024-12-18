import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface InputProps {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean; // Properti baru
}

export default function Input({ label, type, placeholder, value, onChange, readOnly = false }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col mb-4 relative">
      <label className="text-gray-400 mb-1">{label}</label>
      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly} // Properti readOnly
          className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none ${
            readOnly ? "bg-gray-700 text-gray-400 cursor-not-allowed" : ""
          }`}
        />
        {/* Show/Hide Password Icon */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-2/4 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
}
