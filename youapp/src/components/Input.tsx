interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode; 
}

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}: InputProps) {
  return (
    <div className="relative mb-4">
      {label && <label className="block text-gray-400 mb-1">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
      />
      {icon && (
        <div className="absolute right-3 top-2/4 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
    </div>
  );
}
