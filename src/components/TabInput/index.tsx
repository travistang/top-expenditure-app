import classNames from "classnames";

type Props = {
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  className?: string;
  itemClassName?: string;
  onChange: (value: string) => void;
};
export default function TabInput({
  options,
  value,
  className,
  itemClassName,
  onChange,
}: Props) {
  return (
    <div
      className={classNames(
        "flex items-center rounded-lg flex-nowrap",
        className
      )}
    >
      {options.map((option) => (
        <button
          onClick={() => onChange(option.value)}
          key={option.value}
          className={classNames(
            "px-2 py-1 whitespace-nowrap overflow-ellipsis overflow-hidden flex-1",
            "first:rounded-l-lg last:rounded-r-lg",
            itemClassName,
            value === option.value
              ? "bg-green-500/80 text-white"
              : "bg-gray-500"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
