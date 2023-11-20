import classNames from "classnames";

type PlaceholderTextProps = {
  className?: string;
};
function PlaceholderText({ className }: PlaceholderTextProps) {
  return (
    <span
      className={classNames("animate-pulse rounded-md bg-gray-500", className)}
    />
  );
}
type Props = {
  className?: string;
};
export default function ExpenditureRecordPlaceholder({ className }: Props) {
  return (
    <div className={classNames("grid grid-cols-4 gap-2 py-2", className)}>
      <div className="row-start-1 row-ends-3 col-span-1 flex flex-col gap-2">
        <PlaceholderText className="w-full h-4" />
        <PlaceholderText className="w-2/3 h-2" />
      </div>
      <div className="flex row-start-1 col-start-2 col-span-2">
        <PlaceholderText className="w-full h-4" />
      </div>
      <div className="flex justify-end row-start-1 row-ends-3 col-span-1">
        <PlaceholderText className="w-2/3 h-6" />
      </div>
    </div>
  );
}
