import classNames from "classnames";
import { clamp } from "../../utils/numbers";

type Props = {
  className?: string;
  values: { value: number; color: string }[];
  total: number;
  color?: string;
  label?: string;
};

const computeChartStyle = (
  data: { value: number; color: string }[],
  total: number
): React.CSSProperties => {
  const degsStrings: string[] = [];
  let degStart = 0;
  for (const { value, color } of data) {
    const barDegsEnd = clamp(0, degStart + (value / total) * 360, 360);
    degsStrings.push(`${color} ${degStart}deg, ${color} ${barDegsEnd}deg`);
    degStart = barDegsEnd;
  }
  return {
    backgroundImage: `conic-gradient(${degsStrings.join(
      ","
    )}, transparent ${degStart}deg, transparent 360deg)`,
  };
};
export default function PercentageChart({
  className,
  values,
  total,
  label,
}: Props) {
  return (
    <div
      style={computeChartStyle(values, total)}
      className={classNames(
        "rounded-full aspect-square flex items-center justify-center p-4 bg-gray-800",
        className
      )}
    >
      <div className="rounded-full aspect-square w-full h-full bg-gray-400 flex items-center justify-center text-3xl overflow-hidden text-ellipsis whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}
