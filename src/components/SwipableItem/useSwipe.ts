import React, { useRef } from "react";
import { clamp } from "../../utils/numbers";

export type SwipeState = {
  distance: number | null;
  swiping: boolean;
};
export type UseSwipeResult = {
  handlers: {
    onTouchStart: React.TouchEventHandler;
    onTouchEnd: React.TouchEventHandler;
    onTouchCancel: React.TouchEventHandler;
    onTouchMove: React.TouchEventHandler;
    onMouseDown: React.MouseEventHandler;
    onMouseUp: React.MouseEventHandler;
    onMouseMove: React.MouseEventHandler;
    onMouseLeave: React.MouseEventHandler;
  };
  close: () => void;
};

export default function useSwipe(
  containerRef: React.MutableRefObject<HTMLElement>,
  menuItemRef: React.MutableRefObject<HTMLElement>
): UseSwipeResult {
  const swipeStart = useRef<number | null>(null);

  const handleScrollDistance = (distance: number) => {
    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const totalDistance = containerRef.current.scrollWidth;
    const scrollableDistance = totalDistance - containerWidth;
    const clampedDistance = clamp(0, distance, scrollableDistance);
    const scrollRatio = clampedDistance / scrollableDistance;

    containerRef.current.scrollTo(clampedDistance, 0);

    menuItemRef.current.setAttribute(
      "style",
      `opacity:${scrollRatio}; transform:scale(${scrollRatio})`
    );
  };

  const cancelScroll = () => {
    swipeStart.current = null;
  };

  const onTouchStart: React.TouchEventHandler = (e) => {
    swipeStart.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd: React.TouchEventHandler = (e) => {
    cancelScroll();
  };

  const onTouchCancel: React.TouchEventHandler = () => {
    cancelScroll();
  };

  const onTouchMove: React.TouchEventHandler = (e) => {
    if (swipeStart.current === null) return;
    const distance = swipeStart.current - e.targetTouches[0].clientX;
    handleScrollDistance(distance);
  };

  const onMouseDown: React.MouseEventHandler = (e) => {
    swipeStart.current = e.clientX;
    e.persist();
  };
  const onMouseUp: React.MouseEventHandler = (e) => {
    cancelScroll();
  };
  const onMouseMove: React.MouseEventHandler = (e) => {
    if (swipeStart.current === null) return;
    const distance = swipeStart.current - e.clientX;
    handleScrollDistance(distance);
  };

  const onMouseLeave: React.MouseEventHandler = (e) => {
    cancelScroll();
  };

  const close = () =>
    containerRef.current?.scrollTo({ left: 0, behavior: "smooth" });

  return {
    close,
    handlers: {
      onTouchStart,
      onTouchEnd,
      onTouchCancel,
      onTouchMove,

      onMouseDown,
      onMouseUp,
      onMouseMove,
      onMouseLeave,
    },
  };
}
