import classNames from "classnames";
import { useEffect, useState } from "react";
import { formatNumberAsAmount } from "../../utils/strings";

export type BarChartData = {
  label: string;
  values: {
    value: number;
    color: string;
  }[];
};

type XAxisProps = {
  data: BarChartData[];
};
function XAxis({ data }: XAxisProps) {
  return (
    <div className="border-t border-gray-500/50 flex items-center justify-between px-2 text-xs">
      {data.map((d) => (
        <span
          key={d.label}
          className="-rotate-45 translate-y-1 flex-1 flex-shrink-0 flex items-center justify-center whitespace-nowrap text-ellipsis"
        >
          {d.label}
        </span>
      ))}
    </div>
  );
}

type BarProps = {
  data: BarChartData["values"];
  height: number;
  onClick?: () => void;
  selected?: boolean;
};
function Bar({ selected, onClick, data, height }: BarProps) {
  const total = data.reduce((total, point) => total + point.value, 0);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    setTimeout(() => setExpanded(true), 500);
  }, []);
  return (
    <>
      <span
        className={classNames(
          "absolute top-0 rounded-lg z-20 bg-gray-300 flex items-center shadow-md justify-center font-bold text-xs px-2 py-1 whitespace-nowrap",
          "text-gray-800",
          !selected && "hidden"
        )}
      >
        {formatNumberAsAmount(total)}
        <div className="absolute -bottom-1 rotate-45 h-4 w-4 shadow-md bg-gray-300 -z-10" />
      </span>
      <div
        onClick={onClick}
        className={classNames(
          "flex flex-col min-w-[8px] flex-1 w-full items-end transition-all duration-300 origin-bottom px-2",
          !expanded ? "scale-y-0" : "scale-y-100"
        )}
        style={{ height: `${height}%` }}
      >
        {data.map(({ color, value }) => (
          <div
            key={`${color}-${value}`}
            className="w-full min-h-[2px] flex-shrink-0 first:rounded-t-lg"
            style={{
              backgroundColor: color,
              height: `${(value / total) * 100}%`,
            }}
          />
        ))}
      </div>
    </>
  );
}

type Props = {
  data: BarChartData[];
  className?: string;
  selectedBarIndex?: number;
  onSelectBar?: (id: number) => void;
};
const getBarHeightPercent = (maxBarHeight: number, barTotal: number) => {
  return 80 * (barTotal / maxBarHeight);
};

export default function BarChart({
  data,
  className,
  selectedBarIndex,
  onSelectBar,
}: Props) {
  const totalByBars = data.map((bar) =>
    bar.values.reduce((total, { value }) => total + value, 0)
  );
  const maxBarHeight = Math.max(...totalByBars);

  return (
    <div className={classNames("flex flex-col items-stretch h-36", className)}>
      <div className="flex-1 flex-shrink-0 flex flex-nowrap h-full opacity-60 px-2">
        {data.map(({ values, label }, i) => (
          <div
            key={label}
            onClick={() => onSelectBar?.(i)}
            className={classNames(
              "relative flex-1 flex-shrink-0 flex justify-center items-end h-full min-h-[4px] hover:bg-gray-300/20",
              selectedBarIndex === i && "bg-gray-300/50"
            )}
          >
            <Bar
              selected={selectedBarIndex === i}
              data={values}
              height={getBarHeightPercent(maxBarHeight, totalByBars[i])}
            />
          </div>
        ))}
      </div>
      <XAxis data={data} />
    </div>
  );
}
