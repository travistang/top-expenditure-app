import classNames from "classnames";
import { useRef } from "react";
import { IconType } from "react-icons/lib";
import Button from "../Button";

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuItemRef = useRef<HTMLButtonElement>(null!);
  const handleSwipe = () => {
    if (!containerRef.current || !menuItemRef.current) return;
    const parentWidth = containerRef.current.getBoundingClientRect().width;
    const totalWidth = containerRef.current.scrollWidth;
    const currentScroll = containerRef.current.scrollLeft;
    const scrollRatio = currentScroll / (totalWidth - parentWidth);
    menuItemRef.current.setAttribute(
      "style",
      `opacity:${scrollRatio}; transform:scale(${scrollRatio})`
    );
  };
  return (
    <div
      ref={containerRef}
      onScroll={handleSwipe}
      className={classNames(
        "flex flex-nowrap overflow-x-auto gap-2 snap-x no-scrollbar",
        className
      )}
    >
      <div className="w-full flex-shrink-0 snap-start">{children}</div>
      <div className="flex flex-nowrap gap-2 items-center snap-start">
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
