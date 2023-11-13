import classNames from "classnames";
import { useRef } from "react";
import { IconType } from "react-icons/lib";
import Button from "../Button";
import useSwipe from "./useSwipe";

type Props = {
  children: React.ReactNode;
  menuItems: {
    name: string;
    icon: IconType;
    className?: string;
    onClick: () => void;
  }[];

  className?: string;
};
export default function SwipeableItem({
  children,
  menuItems,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const menuItemRef = useRef<HTMLButtonElement>(null!);
  const { handlers, close } = useSwipe(containerRef, menuItemRef);

  return (
    <div
      {...handlers}
      ref={containerRef}
      className={classNames(
        "flex flex-nowrap overflow-x-auto gap-2 snap-x",
        className
      )}
    >
      <div className="w-full flex-shrink-0 snap-start">{children}</div>
      <div
        onClick={close}
        className="flex flex-nowrap gap-2 items-center snap-start min-w-[33%] justify-end"
      >
        {menuItems.map((item) => (
          <Button
            ref={menuItemRef}
            className={classNames("aspect-square rounded-full", item.className)}
            onClick={item.onClick}
            icon={item.icon}
            key={item.name}
          />
        ))}
      </div>
    </div>
  );
}
