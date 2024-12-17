interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: "primary" | "gradient";
  disabled?: boolean; 
}

export default function Button({
  text,
  onClick,
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  const baseStyle =
    "w-full py-2 rounded-md font-semibold text-white focus:outline-none";
  const variantStyle =
    variant === "gradient"
      ? "bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 transition-all duration-300"
      : "bg-blue-500 hover:bg-blue-600";

  const disabledStyle = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled} 
      className={`${baseStyle} ${variantStyle} ${disabled ? disabledStyle : ""}`}
    >
      {text}
    </button>
  );
}
