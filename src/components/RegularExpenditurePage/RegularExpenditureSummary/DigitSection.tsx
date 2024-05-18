import classNames from "classnames";
import { IconType } from "react-icons/lib";
import { Currency } from "../../../domain/currency";
import { formatNumberAsAmount } from "../../../utils/strings";

type Props = {
  value: number;
  formatter?: (v: number) => string;
  title?: string;
  icon?: IconType;
  className?: string;
  textClassName?: string;
  prefix?: string;
  currency: Currency;
};
export default function DigitSection({
  className,
  textClassName,
  value,
  prefix,
  currency,
  title,
  icon: Icon,
}: Props) {
  return (
    <div className={classNames("flex flex-col gap-1", className)}>
      <span className="text-xs font-bold flex items-center gap-2 text-normal">
        {Icon && <Icon />}
        {title}
      </span>
      <span
        className={classNames(
          "text-xl text-normal overflow-hidden text-ellipsis",
          textClassName
        )}
      >
        {prefix ?? "" + formatNumberAsAmount(value, currency)}
      </span>
    </div>
  );
}
