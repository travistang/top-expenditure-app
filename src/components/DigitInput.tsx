import React from "react";
import classNames from "classnames";

type Props = {
  value: number;
  onChange: (v: number) => void;
  className?: string;
};
export default function DigitInput({ value, onChange, className }: Props) {
  return (
    <div
      className={classNames(
        "flex items-center justify-center text-7xl font-mono font-bold",
        className
      )}
    >
      {value.toFixed(2).padStart(5, "0")}€
    </div>
  );
}
