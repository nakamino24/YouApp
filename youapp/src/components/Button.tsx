interface ButtonProps {
  label: string; 
  onClick?: () => void;
  isLoading?: boolean; 
  disabled?: boolean; 
}

export default function Button({ label, onClick, isLoading = false, disabled = false }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`w-full py-3 rounded-lg text-white font-semibold transition 
        ${isLoading || disabled ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
      `}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
}
