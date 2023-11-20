import classNames from "classnames";
import { useCallback, useState } from "react";
import { IconType } from "react-icons/lib";
import Button from "../Button";
import { FaTimes } from "react-icons/fa";

type Props = {
  title?: string;
  icon?: IconType;
  className?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  onDismiss?: () => void;
};
export default function Widget({
  title,
  icon: Icon,
  children,
  className,
  collapsible,
  onDismiss,
}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = useCallback(() => {
    if (!collapsible) return;
    setCollapsed(!collapsed);
  }, [collapsible, collapsed]);

  return (
    <div
      className={classNames(
        "flex flex-col items-stretch gap-2 overflow-hidden bg-gray-500/50 rounded-xl p-2",
        className
      )}
    >
      <div
        className="flex items-center justify-between"
        onClick={toggleCollapse}
      >
        <span className="flex items-center gap-2 text-normal text-xs font-bold">
          {Icon && <Icon className="text-normal" />}
          {title}
        </span>
        {onDismiss && (
          <Button
            color="transparent"
            className="rounded-full aspect-square h-full flex-shrink-0"
            icon={FaTimes}
            onClick={onDismiss}
          />
        )}
      </div>
      <div
        className={classNames(
          "transition duration-300",
          collapsed && "max-h-0",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
