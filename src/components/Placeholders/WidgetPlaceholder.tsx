import classNames from "classnames";

type Props = {
  className?: string;
};
export default function WidgetPlaceholder({ className }: Props) {
  return (
    <div
      className={classNames(
        "flex flex-col p-2 gap-2 rounded-xl bg-gray-500/50 animate-pulse min-h-[64px]",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <div className="rounded-full aspect-square h-2 bg-gray-100 dark:bg-gray-400 animate-pulse flex-shrink-0" />
        <div className="rounded-full w-1/3 h-4 bg-gray-100 dark:bg-gray-400 animate-pulse" />
      </div>
    </div>
  );
}
