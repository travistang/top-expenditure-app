import React, { useState } from "react";
import DigitDisplay from "./components/DigitDisplay";
import Header from "./components/Header";
import Keypad from "./components/Keypad";
import TextInput from "./components/TextInput";

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
      <div className="flex flex-col gap-2 px-2 items-stretch">
        <DigitDisplay
          value={amountStringToAmount(amountString)}
          className="py-4"
        />
        <TextInput label="Name" value="test" onChange={console.log} />
        <Keypad
          className="sticky bottom-0"
          onDigit={onAddDigit}
          onRemoveDigit={onRemoveDigit}
          onClear={onClear}
        />
      </div>
    </div>
  );
}

export default App;
