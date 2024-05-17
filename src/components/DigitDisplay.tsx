import classNames from "classnames";
import { Currency } from "../domain/currency";
import { formatNumberAsAmount } from "../utils/strings";

type Props = {
  value: number;
  onClick?: () => void;
  className?: string;
  currency: Currency;
};
const computeFontSize = (str: string): number => {
  return Math.min(128, 400 / str.length);
};
export default function DigitDisplay({
  currency,
  onClick,
  value,
  className,
}: Props) {
  const displayString = formatNumberAsAmount(value, currency);
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
