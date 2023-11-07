import React, { useState } from "react";
import DigitInput from "./components/DigitInput";
import Header from "./components/Header";
import Keypad from "./components/Keypad";

const amountStringToAmount = (str: string): number => {
  const decimalString = str.slice(-2);
  const integerString = str.slice(0, -2);
  const integer = parseInt(integerString) || 0;
  const decimal = parseInt(decimalString) || 0;
  return integer + decimal / 100;
};

function App() {
  const [amountString, setAmountString] = useState("");
  const onAddDigit = (d: number) => {
    setAmountString(amountString + d.toString());
  };

  const onRemoveDigit = () => {
    setAmountString(amountString.slice(0, -1));
  };
  const onClear = () => {
    setAmountString("");
  };

  return (
    <div className="basic-background flex flex-col gap-2 fixed inset-0">
      <Header />
      <DigitInput
        value={amountStringToAmount(amountString)}
        onChange={console.log}
        className="py-4"
      />
      <Keypad
        className="sticky bottom-0"
        onDigit={onAddDigit}
        onRemoveDigit={onRemoveDigit}
        onClear={onClear}
      />
    </div>
  );
}

export default App;
