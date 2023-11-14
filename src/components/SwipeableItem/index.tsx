import classNames from "classnames";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { IconType } from "react-icons/lib";
import Button, { ButtonColor } from "../Button";
import useSwipe from "./useSwipe";
import { clamp } from "../../utils/numbers";

type MenuItem = {
  name: string;
  color?: ButtonColor;
  icon: IconType;
  className?: string;
  onClick: () => void;
};

export enum SwipeableItemState {
  Idle,
  Deleting,
}

export type SwipeableItemControlParams = {
  setState: (state: SwipeableItemState) => void;
};

type Props = {
  children: React.ReactNode;
  menuItems: MenuItem[];
  className?: string;
};

function SwipeableItem(
  { children, menuItems, className }: Props,
  ref: React.Ref<SwipeableItemControlParams>
) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const menuItemRef = useRef<HTMLButtonElement>(null!);
  const [itemState, setItemState] = useState<SwipeableItemState>(
    SwipeableItemState.Idle
  );
  const [menuOpened, setMenuOpened] = useState(false);
  const handlers = useSwipe({
    onSwipe: (dir) => {
      setMenuOpened(dir === "left");
    },
  });
  useImperativeHandle(ref, () => ({
    setState: setItemState,
  }));

  const onScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const currentScroll = e.currentTarget.scrollLeft;
    const contentWidth = e.currentTarget.clientWidth;
    const visibleWidth = e.currentTarget.getBoundingClientRect().width;
    const scrollableWidth = Math.max(0, contentWidth - visibleWidth);
    const scrollRatio = clamp(0, currentScroll / (scrollableWidth + 0.001), 1);
    menuItemRef.current.setAttribute(
      "style",
      `transform: scale(${scrollRatio}); opacity(${scrollRatio})`
    );
  };

  useEffect(() => {
    const scrollLeft = menuOpened ? 1000 : 0;
    containerRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [menuOpened]);

  return (
    <div
      {...handlers}
      onScroll={onScroll}
      ref={containerRef}
      className={classNames(
        "flex flex-nowrap overflow-hidden gap-2 snap-x duration-300 transition-all bg-gray-300 dark:bg-gray-700",
        {
          "max-h-0 -translate-x-[200vw] opacity-0":
            itemState === SwipeableItemState.Deleting,
          "max-h-full -translate-x-0 opacity-100":
            itemState === SwipeableItemState.Idle,
        },
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
        className="flex flex-nowrap gap-2 items-center snap-start min-w-[33%] justify-end px-2"
      >
        {menuItems.map((item) => (
          <Button
            ref={menuItemRef}
            color={item.color}
            className={classNames(
              "aspect-square rounded-full duration-300 transition-all",
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

export default forwardRef(SwipeableItem);
