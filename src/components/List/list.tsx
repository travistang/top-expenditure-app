import classNames from "classnames";
import { range } from "../../utils/array";
import ExpenditureRecordPlaceholder from "../Placeholders/ExpenditureRecordPlaceholder";
import { useMemo, useRef } from "react";
import ScrollDownHint from "./ScrollDownHint";

type Props<T> = {
  title?: string;
  loading?: boolean;
  itemsPerLine?: number;
  className?: string;
  noResultMessage?: string;
  numPlaceholder?: number;
  placeholder?: React.ReactNode;
  items: T[];
  withScrollDownHint?: boolean;
  children: (t: T) => JSX.Element;
};
export default function List<T>({
  title,
  loading,
  className,
  noResultMessage = "no search results",
  items,
  itemsPerLine = 1,
  numPlaceholder = 6,
  withScrollDownHint,
  placeholder: Placeholder = <ExpenditureRecordPlaceholder />,
  children: renderFunc,
}: Props<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canScrollDown = useMemo(() => {
    if (!containerRef.current) return false;
    const containerHeight = containerRef.current.clientHeight;
    const scrollableHeight = containerRef.current.scrollHeight;
    return scrollableHeight > containerHeight;
  }, []);
  const noResult = !loading && items.length === 0;
  return (
    <div
      ref={containerRef}
      style={{ gridTemplateColumns: `repeat(${itemsPerLine},1fr)` }}
      className={classNames(
        "grid gap-2 items-center justify-center",
        className
      )}
    >
      {title && (
        <span className="text-xs text-normal col-span-full">{title}</span>
      )}
      {noResult && (
        <div className="flex items-center col-span-full min-h-[32px] justify-center text-sm flex-1">
          {noResultMessage}
        </div>
      )}
      {loading && <>{range(numPlaceholder).map(() => Placeholder)}</>}
      {!loading && items.map(renderFunc)}
      {!loading && withScrollDownHint && canScrollDown && <ScrollDownHint />}
    </div>
  );
}
