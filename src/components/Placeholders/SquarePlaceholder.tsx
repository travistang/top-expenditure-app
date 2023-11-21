import classNames from "classnames";

type Props = {
  className?: string;
};
export default function SquarePlaceholder({ className }: Props) {
  return (
    <div
      className={classNames(
        "rounded-xl animate-pulse aspect-square bg-gray-500",
        className
      )}
    />
  );
}
