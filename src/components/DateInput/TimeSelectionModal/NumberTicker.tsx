import classNames from "classnames";
import { range } from "../../../utils/array";
import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  from: number;
  to: number;
  onChange?: (n: number) => void;
  defaultValue?: number;
  formatNumber?: (n: number) => string;
};
export default function NumberTicker({
  formatNumber = (n) => n.toString(),
  from,
  to,
  defaultValue,
  className,
  onChange,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollEndHandler = useRef<NodeJS.Timeout | null>(null);
  const numbers = range(Math.max(0, to - from)).map((i) => i + from);
  useEffect(() => {
    if (
      defaultValue &&
      from <= defaultValue &&
      defaultValue <= to &&
      containerRef.current
    ) {
      const id = defaultValue - from;
      const itemHeight = containerRef.current.clientHeight;
      containerRef.current.scrollTo({
        top: itemHeight * id,
      });
    }
  }, [defaultValue, from, to]);

  const handleScroll = () => {
    if (scrollEndHandler.current) {
      clearTimeout(scrollEndHandler.current);
    }
    scrollEndHandler.current = setTimeout(() => {
      if (!containerRef.current || !onChange) return;
      const scrollTop = containerRef.current.scrollTop;
      if (scrollTop === undefined) return;
      const visibleItemId = Math.round(
        scrollTop / containerRef.current.clientHeight
      );
      onChange(numbers[visibleItemId]);
    }, 300);
  };
  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={classNames(
        "h-24 aspect-square rounded-xl overflow-auto bg-gray-300 dark:bg-gray-400 snap-y snap-mandatory",
        className
      )}
    >
      {numbers.map((num) => (
        <div
          key={num}
          className="snap-center text-5xl font-mono text-gray-800 h-full flex items-center justify-center"
        >
          {formatNumber(num)}
        </div>
      ))}
    </div>
  );
}
