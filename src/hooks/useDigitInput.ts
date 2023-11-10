import { useEffect, useState } from "react";

type UseDigitInputParams = {
  value: number;
  onChange: (v: number) => void;
};

type UseDigitInputResult = {
  onClear: () => void;
  onRemoveDigit: () => void;
  onAddDigit: (d: number) => void;
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

export default function useDigitInput({
  value,
  onChange,
}: UseDigitInputParams): UseDigitInputResult {
  const [amountString, setAmountString] = useState(amountToAmountString(value));
  useEffect(() => setAmountString(amountToAmountString(value)), [value]);

  const onAddDigit = (d: number) => {
    const newAmountString = amountString + d.toString();
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

  return { onAddDigit, onRemoveDigit, onClear };
}
