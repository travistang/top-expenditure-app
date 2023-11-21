import classNames from "classnames";
import { IconType } from "react-icons/lib";

type Props = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  onClick?: () => void;
  icon?: IconType;
};
export default function Widget({
  children,
  className,
  title,
  onClick,
  icon: Icon,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "rounded-xl bg-gray-500/50 p-2 flex flex-col gap-2 items-stretch",
        className
      )}
    >
      <span className="flex items-center gap-1 text-xs font-bold flex-shrink-0 text-normal">
        {Icon && <Icon />}
        {title}
      </span>
      {children}
    </div>
  );
}
