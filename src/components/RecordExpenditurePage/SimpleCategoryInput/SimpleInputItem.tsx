import classNames from "classnames";
import { CSSProperties } from "react";

type Props = {
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
  children: React.ReactNode;
};
export default function SimpleInputItem({
  onClick,
  style,
  className,
  children,
}: Props) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={classNames(
        "rounded-lg flex gap-2 items-center flex-shrink-0",
        className
      )}
    >
      {children}
    </div>
  );
}
