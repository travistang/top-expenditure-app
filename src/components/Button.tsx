import classNames from "classnames";
import React, { forwardRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { IconType } from "react-icons/lib";

export type ButtonColor = "red" | "green" | "indigo" | "gray" | "transparent";
const ButtonColorStyles: Record<ButtonColor, string> = {
  red: "bg-red-500 active:bg-red-700 text-gray-200",
  green: "bg-green-500 active:bg-green-700 text-gray-200",
  indigo: "bg-indigo-500 active:bg-indigo-700 text-gray-200",
  gray: "bg-gray-500 active:bg-gray-700",
  transparent: "bg-transparent active:bg-gray-200/50",
};

type Props = {
  icon?: IconType;
  color?: ButtonColor;
  style?: React.CSSProperties;
  squared?: boolean;
  onClick?: () => void | Promise<void>;
  className?: string;
  text?: string;
  iconClassName?: string;
  disabled?: boolean;
};
function Button(
  {
    icon: Icon,
    text,
    onClick,
    style,
    squared,
    className,
    disabled,
    color,
    iconClassName,
  }: Props,
  ref: React.Ref<HTMLButtonElement>
) {
  const [onClickRunning, setOnClickRunning] = useState(false);
  const shouldDisableButton = disabled || onClickRunning;
  const onClickWithLoading = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (shouldDisableButton) return;
    Promise.resolve()
      .then(() => setOnClickRunning(true))
      .then(onClick)
      .finally(() => setOnClickRunning(false));
  };
  return (
    <button
      ref={ref}
      style={style}
      onClick={onClickWithLoading}
      className={classNames(
        "flex items-center justify-center gap-1 py-1 px-2 transition-all",
        squared ? "rounded-xl" : "rounded-full",
        shouldDisableButton && "opacity-70 cursor-not-allowed",
        color && ButtonColorStyles[color],
        className
      )}
    >
      {onClickRunning ? (
        <FaSpinner className="animate-spin text-gray-800" />
      ) : (
        <>
          {Icon && <Icon className={iconClassName} />}
          {text}
        </>
      )}
    </button>
  );
}

export default forwardRef(Button);
