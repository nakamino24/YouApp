import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

interface InputProps {
  label: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  readOnly?: boolean;
  options?: string[];
}

export default function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
  readOnly = false,
  options,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col mb-4 relative">
      <label className="text-gray-400 mb-1">{label}</label>
      <div className="relative">
        {/* Dropdown Select */}
        {type === "select" && options ? (
          <select
            value={value}
            onChange={onChange}
            disabled={readOnly}
            className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none ${
              readOnly ? "bg-gray-700 text-gray-400 cursor-not-allowed" : ""
            }`}
          >
            <option value="" disabled>
              {placeholder || "Select an option"}
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : type === "file" ? (
          // File Input
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (onChange && e.target instanceof HTMLInputElement) {
                onChange(e);
              }
            }}
            disabled={readOnly}
            className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gray-700 file:text-gray-300 ${
              readOnly ? "cursor-not-allowed" : ""
            }`}
          />
        ) : (
          // Input Field (default)
          <input
            type={isPassword && showPassword ? "text" : type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className={`w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none ${
              readOnly ? "bg-gray-700 text-gray-400 cursor-not-allowed" : ""
            }`}
          />
        )}
        {/* Show/Hide Password Icon */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-2/4 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
