import classNames from "classnames";
import { useState } from "react";
import Button from "../Button";
import { FaCheck, FaTimes } from "react-icons/fa";

type Props = {
  label?: string;
  className?: string;
  inputComponent: React.ReactNode;
  children: React.ReactNode;
  onCancel?: () => void;
  onCommit?: () => void;
};
export default function DisplayInputBase({
  onCommit,
  onCancel,
  inputComponent,
  label,
  children,
  className,
}: Props) {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <div
        onClick={() => setEditing(true)}
        className={classNames("flex flex-col gap-2 items-stretch", className)}
      >
        {label && <span className="text-xs font-bold">{label}</span>}
        {children}
      </div>
    );
  }
  const commitChanges = () => {
    onCommit?.();
    setEditing(false);
  };
  const discardChanges = () => {
    onCancel?.();
    setEditing(false);
  };

  return (
    <div className={classNames("grid grid-cols-6 gap-2", className)}>
      {label && (
        <span className="col-span-full text-xs font-bold">{label}</span>
      )}
      {inputComponent}
      <Button
        icon={FaTimes}
        className="h-8 text-sm flex-shrink-0 aspect-square"
        onClick={discardChanges}
      />
      <Button
        icon={FaCheck}
        className="h-8 text-sm flex-shrink-0 aspect-square text-green-500"
        onClick={commitChanges}
      />
    </div>
  );
}
