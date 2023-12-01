import ExpenditureRecordPlaceholder from "../Placeholders/ExpenditureRecordPlaceholder";
import SquarePlaceholder from "../Placeholders/SquarePlaceholder";

export default function ExpenditureDetailPlaceholder() {
  return (
    <div className="grid grid-cols-4 gap-2">
      <ExpenditureRecordPlaceholder className="col-span-4" />
      <SquarePlaceholder className="col-span-2" />
    </div>
  );
}
