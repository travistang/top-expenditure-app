import classNames from "classnames";

type Props = {
  className?: string;
  rounded?: boolean;
};
export default function LinePlaceholder({ className, rounded }: Props) {
  return (
    <div
      className={classNames(
        "animate-pulse min-h-[8px] bg-gray-500/50",
        rounded ? "rounded-full" : "rounded-xl",
        className
      )}
    />
  );
}
