import classNames from "classnames";
import { useState } from "react";

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
  const [editing, setEditing] = useState(false);
  if (!editing) {
    return (
      <div
        onClick={() => setEditing(true)}
        className={classNames("flex flex-col gap-2 items-stretch", className)}
      >
        {label && <span className="text-xs font-bold">{label}</span>}
        <span className={classNames(!value && "text-opacity-50")}>
          {value || emptyValueMessage}
        </span>
      </div>
    );
  }
  return (
    <div className={classNames("flex flex-col gap-2 items-stretch", className)}>
      {label && <span className="text-xs font-bold">{label}</span>}
      <span className={classNames(!value && "text-opacity-50")}>
        {value || emptyValueMessage}
      </span>
    </div>
  );
}
