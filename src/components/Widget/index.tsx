import classNames from "classnames";
import { useCallback, useState } from "react";
import { FaLock, FaTimes, FaUnlock } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import Button from "../Button";
import useSensitiveMask, { MaskState } from "./useSensitiveMaskState";

type Props = {
  title?: string;
  sensitive?: boolean;
  icon?: IconType;
  className?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  onDismiss?: () => void;
  onClick?: () => void;
};
export default function Widget({
  title,
  sensitive,
  icon: Icon,
  children,
  className,
  collapsible,
  onDismiss,
  onClick,
}: Props) {
  const [maskState, toggleMasked] = useSensitiveMask(sensitive);
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = useCallback(() => {
    if (!collapsible) return;
    setCollapsed(!collapsed);
  }, [collapsible, collapsed]);

  return (
    <div
      className={classNames(
        "flex flex-col items-stretch gap-2 overflow-hidden bg-gray-400/70 dark:bg-gray-500/50 rounded-xl p-2",
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
        {sensitive && (
          <Button
            color="transparent"
            className="text-xs p-0"
            icon={maskState === MaskState.Masked ? FaUnlock : FaLock}
            text={maskState === MaskState.Masked ? "Reveal" : "Hide"}
            onClick={toggleMasked}
          />
        )}
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
        onClick={onClick}
        className={classNames(
          "relative transition duration-300",
          collapsed && "max-h-0",
          sensitive && !collapsed && "min-h-[72px]",
          className
        )}
      >
        {sensitive && (
          <div
            className={classNames(
              "rounded-sm absolute inset-0 transition-all duration-300 bg-gray-300/40 dark:bg-gray-700/40 flex flex-col gap-2 items-center justify-center text-normal text-sm p-4",
              [MaskState.Masking, MaskState.Masked].includes(maskState) &&
                "backdrop-blur-sm opacity-100",
              [MaskState.Revealed, MaskState.Revealing].includes(maskState) &&
                "opacity-0 bg-opacity-0 backdrop-blur-0",
              maskState === MaskState.Revealed && "-z-10"
            )}
          >
            <FaLock className="text-normal text-3xl" />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
