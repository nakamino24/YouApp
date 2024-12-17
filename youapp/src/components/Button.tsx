interface ButtonProps {
    text: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
}
  
export default function Button({ text, onClick, variant = "primary" }: ButtonProps) {
    const baseStyle = "py-2 px-4 rounded text-white font-semibold";
    const variantStyle =
      variant === "primary" ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 hover:bg-gray-600";
  
    return (
      <button onClick={onClick} className={`${baseStyle} ${variantStyle}`}>
        {text}
      </button>
    );
}
  