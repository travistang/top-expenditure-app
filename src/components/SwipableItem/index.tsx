import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
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
  const [menuOpened, setMenuOpened] = useState(false);
  const handlers = useSwipe({ onSwipe: (dir) => setMenuOpened(true) });

  useEffect(() => {}, []);
  return (
    <div
      {...handlers}
      ref={containerRef}
      className={classNames(
        "flex flex-nowrap overflow-x-auto gap-2 snap-x duration-300 transition-all",
        menuOpened && "-ml-[40px]",
        className
      )}
    >
      <div
        className={classNames(
          "w-full flex-shrink-0 snap-start duration-300 transition-all"
        )}
      >
        {children}
      </div>
      <div
        onClick={() => setMenuOpened(false)}
        className="flex flex-nowrap gap-2 items-center snap-start min-w-[33%] justify-end"
      >
        {menuItems.map((item) => (
          <Button
            ref={menuItemRef}
            className={classNames(
              "aspect-square rounded-full duration-300 transition-all",
              !menuOpened && "opacity-0 scale-0",
              item.className
            )}
            onClick={item.onClick}
            icon={item.icon}
            key={item.name}
          />
        ))}
      </div>
    </div>
  );
}
