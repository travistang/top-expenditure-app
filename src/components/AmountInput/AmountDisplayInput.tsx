import classNames from "classnames";
import { useEffect, useState } from "react";
import AmountInput from ".";
import { Currency } from "../../domain/currency";
import { formatNumberAsAmount } from "../../utils/strings";
import DisplayInputBase from "../DisplayInput/DisplayInputBase";

type Props = {
  amount: number;
  onChange: (amount: number) => void;
  className?: string;
  label?: string;
  currency: Currency;
};
export default function AmountDisplayInput({
  amount,
  onChange,
  className,
  currency,
  label,
}: Props) {
  const [valuePlaceholder, setValuePlaceholder] = useState(amount);
  useEffect(() => {
    setValuePlaceholder(amount);
  }, [amount]);

  const onCommit = () => {
    onChange(valuePlaceholder);
  };

  const onCancel = () => {
    setValuePlaceholder(amount);
  };
  return (
    <DisplayInputBase
      className={classNames("justify-self-end", className)}
      inputComponent={
        <AmountInput
          className={classNames("flex-1 col-span-4")}
          currency={currency}
          amount={valuePlaceholder}
          onChange={setValuePlaceholder}
        />
      }
      label={label}
      onCancel={onCancel}
      onCommit={onCommit}
    >
      <span className="font-mono">
        {formatNumberAsAmount(amount, currency)}
      </span>
    </DisplayInputBase>
  );
}
