import React from "react";

interface ZodiacIconProps {
  sign: string;
  className?: string;
}

const zodiacIcons: Record<string, string> = {
  Rat: "🐀",
  Ox: "🐂",
  Tiger: "🐅",
  Rabbit: "🐇",
  Dragon: "🐉",
  Snake: "🐍",
  Horse: "🐎",
  Goat: "🐐",
  Monkey: "🐒",
  Rooster: "🐓",
  Dog: "🐕",
  Pig: "🐖",
};

export default function ZodiacIcon({ sign, className }: ZodiacIconProps) {
  const icon = zodiacIcons[sign] || "✨";
  return <span className={`text-2xl ${className}`}>{icon}</span>;
}
