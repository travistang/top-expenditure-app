import classNames from "classnames";
import React from "react";
import { IconType } from "react-icons/lib";

type Props = {
  icon?: IconType;
  onClick?: () => void;
  className?: string;
  text?: string;
};
export default function Button({
  icon: Icon,
  text,
  onClick,
  className,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "flex items-center gap-1 rounded-full py-1 px-2",
        className
      )}
    >
      {Icon && <Icon />}
      {text}
    </button>
  );
}
