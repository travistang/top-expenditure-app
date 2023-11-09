import classNames from "classnames";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { IconType } from "react-icons/lib";

type Props = {
  icon?: IconType;
  onClick?: () => void | Promise<void>;
  className?: string;
  text?: string;
  disabled?: boolean;
};
export default function Button({
  icon: Icon,
  text,
  onClick,
  className,
  disabled,
}: Props) {
  const [onClickRunning, setOnClickRunning] = useState(false);
  const shouldDisableButton = disabled || onClickRunning;
  const onClickWithLoading = () => {
    if (shouldDisableButton) return;
    Promise.resolve()
      .then(() => setOnClickRunning(true))
      .then(onClick)
      .finally(() => setOnClickRunning(false));
  };
  return (
    <button
      onClick={onClickWithLoading}
      className={classNames(
        "flex items-center justify-center gap-1 rounded-full py-1 px-2 transition-all",
        shouldDisableButton && "opacity-70 cursor-not-allowed",
        className
      )}
    >
      {onClickRunning ? (
        <FaSpinner className="animate-spin text-gray-800" />
      ) : (
        <>
          {Icon && <Icon />}
          {text}
        </>
      )}
    </button>
  );
}
