import React from "react";

interface HoroscopeIconProps {
  sign: string;
  className?: string;
}

const horoscopeIcons: Record<string, string> = {
  Aries: "♈",
  Taurus: "♉",
  Gemini: "♊",
  Cancer: "♋",
  Leo: "♌",
  Virgo: "♍",
  Libra: "♎",
  Scorpio: "♏",
  Sagittarius: "♐",
  Capricorn: "♑",
  Aquarius: "♒",
  Pisces: "♓",
};

export default function HoroscopeIcon({ sign, className }: HoroscopeIconProps) {
  const icon = horoscopeIcons[sign] || "✨";
  return <span className={`text-2xl ${className}`}>{icon}</span>;
}
