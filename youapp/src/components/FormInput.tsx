interface Props {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
  
const FormInput: React.FC<Props> = ({ label, type = "text", value, onChange }) => (
    <div>
      <label className="block mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border p-2 w-full rounded"
      />
    </div>
);
  
export default FormInput;
  