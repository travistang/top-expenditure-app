import classNames from "classnames";
import Button from "./Button";
import { FaCheck } from "react-icons/fa";

type Props = {
  className?: string;
  checked?: boolean;
  onToggle: () => void;
  text?: string;
};
export default function CheckboxInput({
  checked,
  className,
  onToggle,
  text,
}: Props) {
  return (
    <div
      onClick={onToggle}
      className={classNames("flex items-center gap-2 flex-nowrap", className)}
    >
      <Button
        onClick={onToggle}
        color={checked ? "indigo" : undefined}
        icon={checked ? FaCheck : undefined}
        className={classNames(
          "rounded-full aspect-square h-6 w-6 text-xs",
          !checked && "border border-gray-800 dark:border-gray-200"
        )}
      />
      {text && <span className="text-normal text-xs">{text}</span>}
    </div>
  );
}
