import classNames from "classnames";
import { useEffect, useState } from "react";

export type PercentageBarData = { id: string; value: number; color: string };
type Props = {
  data: PercentageBarData[];
  className?: string;
};
export default function PercentageBar({ data, className }: Props) {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    setTimeout(() => setExpanded(true), 300);
  }, [data]);
  return (
    <div
      className={classNames(
        "flex flex-nowrap bg-gray-500/50 rounded-full",
        className
      )}
    >
      <div
        className={classNames(
          "transition-all duration-300 flex flex-nowrap w-full",
          expanded ? "max-w-full" : "max-w-0"
        )}
      >
        {data.map(({ id, color, value }) => (
          <div
            key={id}
            style={{
              width: `${value}%`,
              backgroundColor: color,
              minWidth: expanded ? 4 : 0,
            }}
            className="first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>
    </div>
  );
}
