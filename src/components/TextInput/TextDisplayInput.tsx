import classNames from "classnames";
import { useEffect, useState } from "react";
import DisplayInputBase from "../DisplayInput/DisplayInputBase";

type InnerTextInputProps = {
  value: string;
  onChange: (text: string) => void;
};
function InnerTextInput({ value, onChange }: InnerTextInputProps) {
  return (
    <div className="rounded-xl border border-gray-800 dark:border-gray-200 px-2 py-1 col-span-4 overflow-hidden">
      <input
        value={value}
        className="bg-transparent border-none outline-none"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
type Props = {
  value: string;
  label?: string;
  className?: string;
  emptyValueMessage?: string;
  onChange: (value: string) => void;
};
export default function TextDisplayInput({
  emptyValueMessage = "- no value -",
  value,
  label,
  className,
  onChange,
}: Props) {
  const [valuePlaceholder, setValuePlaceholder] = useState(value);

  useEffect(() => {
    setValuePlaceholder(value);
  }, [value]);

  const onCommit = () => {
    onChange(valuePlaceholder);
  };

  const onCancel = () => {
    setValuePlaceholder(value);
  };

  return (
    <DisplayInputBase
      label={label}
      className={className}
      inputComponent={
        <InnerTextInput
          value={valuePlaceholder}
          onChange={setValuePlaceholder}
        />
      }
      onCancel={onCancel}
      onCommit={onCommit}
    >
      <span className={classNames(!value && "text-opacity-50")}>
        {value || emptyValueMessage}
      </span>
    </DisplayInputBase>
  );
}
