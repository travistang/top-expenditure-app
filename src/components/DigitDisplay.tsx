import React from "react";
import classNames from "classnames";

type Props = {
  value: number;
  onClick?: () => void;
  className?: string;
};
const computeFontSize = (str: string): number => {
  return Math.min(128, 400 / str.length);
};
export default function DigitDisplay({ onClick, value, className }: Props) {
  const displayString = `${value.toFixed(2).padStart(5, "0")}€`;
  return (
    <div
      onClick={onClick}
      className={classNames(
        "flex items-center justify-center font-mono font-bold",
        className
      )}
      style={{ fontSize: computeFontSize(displayString) }}
    >
      {displayString}
    </div>
  );
}
