import { IconType } from "react-icons/lib";
import { formatNumberAsAmount } from "../../utils/strings";
import Widget from ".";
import classNames from "classnames";

type Props = {
  title?: string;
  icon?: IconType;
  className?: string;
  amount: number;
  formatter?: (amount: number) => string;
};
export default function AmountWidget({
  title,
  icon,
  className,
  amount,
  formatter = formatNumberAsAmount,
}: Props) {
  return (
    <Widget
      icon={icon}
      className={classNames("text-3xl", className)}
      title={title}
    >
      {formatter(amount)}
    </Widget>
  );
}
