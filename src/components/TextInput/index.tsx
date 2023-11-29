import { IconType } from "react-icons/lib";
import InputBase from "../InputBase";
import classNames from "classnames";
import Button from "../Button";
import { FaTimes } from "react-icons/fa";

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
    <InputBase label={label} className={classNames("pr-2", className)}>
      {Icon && <Icon className="text-gray-800" />}
      <input
        placeholder={placeholder}
        className="w-full outline-none border-none bg-transparent text-gray-800 placeholder:text-gray-500 "
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value.length > 0 && (
        <Button
          icon={FaTimes}
          className="text-gray-800"
          onClick={() => onChange("")}
        />
      )}
    </InputBase>
  );
}
