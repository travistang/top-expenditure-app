import classNames from "classnames";

type Props = {
  className?: string;
};
export default function IconAndLinePlaceholder({ className }: Props) {
  return (
    <div className={classNames("flex gap-2 items-center", className)}>
      <div className="bg-gray-500 rounded-full aspect-square h-full animate-pulse" />
      <div className="bg-gray-500 flex-1 rounded-full animate-pulse h-8" />
    </div>
  );
}
