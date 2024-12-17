interface ButtonProps {
    text: string;
    onClick: () => void;
    variant?: "primary" | "gradient";
}
  
export default function Button({ text, onClick, variant = "primary" }: ButtonProps) {
    const baseStyle = "w-full py-2 rounded-md font-semibold text-white";
    const variantStyle =
      variant === "gradient"
        ? "bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 transition-all duration-300"
        : "bg-blue-500 hover:bg-blue-600";
        
    return (
      <button onClick={onClick} className={`${baseStyle} ${variantStyle}`}>
        {text}
      </button>
    );
}
  