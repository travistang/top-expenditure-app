import classNames from "classnames";

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};
export default function KeyButton({ className, onClick, children }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "font-mono text-4xl font-bold flex items-center justify-center rounded-full aspect-square h-28 text-normal self-center justify-self-center",
        className ??
          "bg-gray-600 dark:bg-gray-500 active:bg-gray-600 text-gray-200"
      )}
    >
      {children}
    </button>
  );
}
