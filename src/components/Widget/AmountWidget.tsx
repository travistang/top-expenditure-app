import classNames from "classnames";
import { IconType } from "react-icons/lib";
import Widget from ".";
import { Currency } from "../../domain/currency";
import { formatNumberAsAmount } from "../../utils/strings";

type Props = {
  title?: string;
  icon?: IconType;
  className?: string;
  amount: number;
  currency: Currency;
};
export default function AmountWidget({
  title,
  icon,
  className,
  currency,
  amount,
}: Props) {
  return (
    <Widget
      icon={icon}
      className={classNames("text-3xl", className)}
      title={title}
    >
      {formatNumberAsAmount(amount, currency)}
    </Widget>
  );
}
