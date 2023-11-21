import classNames from "classnames";
import { range } from "../../utils/array";
import ExpenditureRecordPlaceholder from "../ExpenditureRecord/ExpenditureRecordPlaceholder";

type Props<T> = {
  title?: string;
  loading?: boolean;
  itemsPerLine?: number;
  className?: string;
  noResultMessage?: string;
  numPlaceholder?: number;
  placeholder?: React.ReactNode;
  items: T[];
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
  placeholder: Placeholder = <ExpenditureRecordPlaceholder />,
  children: renderFunc,
}: Props<T>) {
  const noResult = !loading && items.length === 0;
  return (
    <div
      style={{ gridTemplateColumns: `repeat(${itemsPerLine},1fr)` }}
      className={classNames("grid gap-2", className)}
    >
      {title && (
        <span className="text-xs text-normal col-span-full">{title}</span>
      )}
      {noResult && (
        <div className="flex items-center col-span-full row-span-full justify-center text-sm flex-1">
          {noResultMessage}
        </div>
      )}
      {loading && <>{range(numPlaceholder).map(() => Placeholder)}</>}
      {!loading && items.map(renderFunc)}
    </div>
  );
}
