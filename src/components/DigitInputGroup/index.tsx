import { useEffect, useState } from "react";
import DigitDisplay from "../DigitDisplay";
import classNames from "classnames";
import { createPortal } from "react-dom";
import Keypad from "../Keypad";

type Props = {
  value: number;
  showNumPad: boolean;
  toggleNumPad: () => void;
  onChange: (value: number) => void;
  keypadPortalId: string;
};
const amountStringToAmount = (str: string): number => {
  const decimalString = str.slice(-2);
  const integerString = str.slice(0, -2);
  const integer = parseInt(integerString) || 0;
  const decimal = parseInt(decimalString) || 0;
  return integer + decimal / 100;
};

const amountToAmountString = (amount: number): string => {
  if (!amount) return "";
  return amount.toFixed(2).replace(".", "");
};

export default function DigitInputGroup({
  value,
  showNumPad,
  toggleNumPad,
  onChange,
  keypadPortalId,
}: Props) {
  const [domReady, setDomReady] = useState(false);
  const [amountString, setAmountString] = useState(amountToAmountString(value));
  useEffect(() => setDomReady(true), []);
  useEffect(() => setAmountString(amountToAmountString(value)), [value]);

  const onAddDigit = (d: number) => {
    const newAmountString = amountString + d.toString();
    console.log({
      d,
      newAmountString,
      asAmount: amountStringToAmount(newAmountString),
    });
    setAmountString(newAmountString);
    onChange(amountStringToAmount(newAmountString));
  };

  const onRemoveDigit = () => {
    const newAmountString = amountString.slice(0, -1);
    setAmountString(newAmountString);
    onChange(amountStringToAmount(newAmountString));
  };
  const onClear = () => {
    setAmountString("");
    onChange(0);
  };

  return (
    <>
      <DigitDisplay
        onClick={toggleNumPad}
        value={amountStringToAmount(amountString)}
        className={classNames(
          "transition-all duration-300",
          showNumPad ? "h-1/3" : "h-1/4"
        )}
      />
      {domReady &&
        createPortal(
          <Keypad
            className={classNames(
              "absolute bottom-0 w-full top-1/3 transition-all duration-300 shadow-xl rounded-t-3xl py-4 bg-gray-300 dark:bg-gray-900 z-30",
              !showNumPad && "translate-y-[100vh]"
            )}
            onDigit={onAddDigit}
            onRemoveDigit={onRemoveDigit}
            onClear={onClear}
          />,
          document.getElementById(keypadPortalId)!
        )}
    </>
  );
}
