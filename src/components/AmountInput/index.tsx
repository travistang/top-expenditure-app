import { useState } from "react";
import classNames from "classnames";
import { createPortal } from "react-dom";

import DigitDisplay from "../DigitDisplay";
import Keypad from "../Keypad";
import useDigitInput from "../../hooks/useDigitInput";
import Button from "../Button";
import { FaTimes } from "react-icons/fa";

type BaseProps = {
  label?: string;
  className?: string;
  formatter?: (value: number) => string;
};

type NullableProps = {
  nullable: true;
  amount?: number;
  onChange: (value?: number) => void;
};

type NonNullableProps = {
  nullable?: false;
  amount: number;
  onChange: (value: number) => void;
};

type Props = BaseProps & (NullableProps | NonNullableProps);

export default function AmountInput({
  label,
  nullable,
  formatter = (v) => v.toString(),
  className,
  amount,
  onChange,
}: Props) {
  console.log({ amount });
  const [showNumPad, setShowNumPad] = useState(false);
  const { onAddDigit, onClear, onRemoveDigit } = useDigitInput({
    value: amount ?? 0,
    onChange,
  });
  const onClearValue = () => {
    if (!nullable) return;
    onChange(undefined);
  };
  return (
    <div className={classNames("flex flex-col items-stretch gap-2", className)}>
      {label && <span className="text-xs font-bold">{label}</span>}
      <div
        onClick={() => setShowNumPad(true)}
        className={classNames(
          "flex items-center px-2 py-1 border rounded-lg border-gray-800 dark:border-gray-200"
        )}
      >
        <span className="flex-1 font-mono">
          {amount === undefined ? "--" : formatter(amount)}
        </span>
        {nullable && amount !== undefined && (
          <Button
            icon={FaTimes}
            className="text-normal"
            onClick={onClearValue}
          />
        )}
      </div>
      {createPortal(
        <>
          <div
            className={classNames(
              "inset-0 fixed transition-all duration-300 flex flex-col",
              showNumPad ? "backdrop-blur-lg z-50" : "-z-10"
            )}
          >
            <div
              onClick={() => setShowNumPad(false)}
              className={classNames(
                "h-1/3 flex items-center justify-center transition-all duration-300",
                !showNumPad && "-translate-y-full"
              )}
            >
              <div
                className={classNames(
                  "p-2 rounded-xl flex flex-col gap-2 items-stretch justify-center h-1/3"
                )}
              >
                <span className="text-normal">{label}</span>
                <DigitDisplay value={amount ?? 0} />
              </div>
            </div>
            <div
              className={classNames(
                "absolute z-50 bottom-0 left-0 w-full h-2/3 transition-all duration-300 bg-normal rounded-t-xl shadow-xl",
                !showNumPad && "translate-y-full"
              )}
            >
              <Keypad
                onDigit={onAddDigit}
                onClear={onClear}
                onRemoveDigit={onRemoveDigit}
                className={classNames("h-full")}
              />
            </div>
          </div>
        </>,
        document.getElementById("root")!
      )}
    </div>
  );
}
