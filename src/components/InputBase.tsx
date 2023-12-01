import classNames from "classnames";

type Props = {
  className?: string;
  children?: React.ReactNode;
  label?: string;
  onClick?: () => void;
};
export default function InputBase({
  onClick,
  className,
  children,
  label,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={classNames("flex flex-col items-stretch gap-1", className)}
    >
      {label && <span className="text-xs font-bold">{label}</span>}
      <div className="h-10 w-full rounded-full px-4 py-1 flex items-center bg-gray-400 dark:bg-gray-300 focus:outline-indigo-500 gap-2">
        {children}
      </div>
    </div>
  );
}
