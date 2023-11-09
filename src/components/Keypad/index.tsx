import classNames from "classnames";
import React from "react";
import KeyButton from "./KeyButton";
import { FaArrowLeft, FaTimes } from "react-icons/fa";

type Props = {
  onDigit: (v: number) => void;
  onRemoveDigit: () => void;
  onClear: () => void;
  className?: string;
};
const DIGITS_WITHOUT_ZERO = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function Keypad({
  onRemoveDigit,
  onClear,
  onDigit,
  className,
}: Props) {
  return (
    <div className={classNames("grid grid-cols-3 gap-2", className)}>
      {DIGITS_WITHOUT_ZERO.map((d) => (
        <KeyButton key={d} onClick={() => onDigit(d)}>
          {d}
        </KeyButton>
      ))}
      <KeyButton onClick={onClear} className="bg-red-500 active:bg-red-800">
        <FaTimes />
      </KeyButton>
      <KeyButton onClick={() => onDigit(0)}>0</KeyButton>
      <KeyButton
        onClick={onRemoveDigit}
        className="bg-yellow-500 active:bg-yellow-700"
      >
        <FaArrowLeft />
      </KeyButton>
    </div>
  );
}
