import { IconType } from "react-icons/lib";
import InputBase from "../InputBase";

type Props = {
  className?: string;
  icon?: IconType;
  value: string;
  placeholder?: string;
  onChange: (t: string) => void;
  label?: string;
};
export default function TextInput({
  className,
  icon: Icon,
  value,
  placeholder,
  onChange,
  label,
}: Props) {
  return (
    <InputBase label={label} className={className}>
      {Icon && <Icon className="text-gray-800" />}
      <input
        placeholder={placeholder}
        className="w-full outline-none border-none bg-transparent text-gray-800"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputBase>
  );
}
