import React, { useRef } from "react";

export type SwipeDirection = "left" | "right";
export type UseSwipeParams = {
  onSwipe: (direction: SwipeDirection) => void;
};

export type UseSwipeResult = {
  onTouchStart: React.TouchEventHandler;
  onTouchEnd: React.TouchEventHandler;
  onTouchCancel: React.TouchEventHandler;
  onTouchMove: React.TouchEventHandler;
  onMouseDown: React.MouseEventHandler;
  onMouseUp: React.MouseEventHandler;
  onMouseMove: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
};

export default function useSwipe({ onSwipe }: UseSwipeParams): UseSwipeResult {
  const swipeStart = useRef<number | null>(null);

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
    const direction: SwipeDirection = distance < 0 ? "right" : "left";
    onSwipe(direction);
    cancelScroll();
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
    const direction: SwipeDirection = distance < 0 ? "right" : "left";
    onSwipe(direction);
  };

  const onMouseLeave: React.MouseEventHandler = (e) => {
    cancelScroll();
  };

  return {
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
    onTouchMove,

    onMouseDown,
    onMouseUp,
    onMouseMove,
    onMouseLeave,
  };
}
