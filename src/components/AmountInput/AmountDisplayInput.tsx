import { useEffect, useState } from "react";
import classNames from "classnames";
import DisplayInputBase from "../DisplayInput/DisplayInputBase";
import { formatNumberAsAmount } from "../../utils/strings";
import AmountInput from ".";

type Props = {
  amount: number;
  onChange: (amount: number) => void;
  className?: string;
  label?: string;
};
export default function AmountDisplayInput({
  amount,
  onChange,
  className,
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
          amount={valuePlaceholder}
          formatter={formatNumberAsAmount}
          onChange={setValuePlaceholder}
        />
      }
      label={label}
      onCancel={onCancel}
      onCommit={onCommit}
    >
      <span className="font-mono">{formatNumberAsAmount(amount)}</span>
    </DisplayInputBase>
  );
}
