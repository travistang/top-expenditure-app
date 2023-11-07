import classNames from "classnames";

type Props = {
  className?: string;
  value: string;
  onChange: (t: string) => void;
  label?: string;
};
export default function TextInput({
  className,
  value,
  onChange,
  label,
}: Props) {
  return (
    <div className={classNames("flex flex-col items-stretch gap-1", className)}>
      {label && <span className="text-xs font-bold">{label}</span>}
      <div className="w-full rounded-full px-2 py-1 flex items-stretch bg-gray-400 dark:bg-gray-300 focus:outline-indigo-500">
        <input
          className="w-full outline-none border-none bg-transparent text-gray-800"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
