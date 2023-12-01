import classNames from "classnames";

type Props = {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
};
export default function DateInputSection({
  onClick,
  children,
  className,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "justify-center rounded-xl h-10 px-2 bg-gray-400 dark:bg-gray-300 flex items-center overflow-hidden text-gray-800",
        className
      )}
    >
      {children}
    </div>
  );
}
