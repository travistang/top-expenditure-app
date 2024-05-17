import { ExpenditureWithId } from "../../domain/expenditure";
import { Updater } from "../../utils/objects";
import AmountDisplayInput from "../AmountInput/AmountDisplayInput";
import CategoryInput from "../CategoryInput";
import DateInput from "../DateInput";
import TagsDisplayInput from "../TagsInput/TagsDisplayInput";
import TextDisplayInput from "../TextInput/TextDisplayInput";

type Props = {
  expenditure: ExpenditureWithId;
  updater: Updater<ExpenditureWithId>;
};
export default function ExpenditureDetailForm({ expenditure, updater }: Props) {
  const isRegularExpenditure = !!expenditure.repeat;
  return (
    <div className="grid grid-cols-6 gap-2">
      <TextDisplayInput
        label="Name"
        className="col-span-3"
        value={expenditure.name}
        onChange={updater("name")}
      />
      <AmountDisplayInput
        currency={expenditure.currency}
        className="col-span-3 self-end"
        amount={expenditure.amount}
        onChange={updater("amount")}
      />
      <DateInput
        label={isRegularExpenditure ? "Start repeating at" : "Date"}
        date={expenditure.date}
        onChange={updater("date")}
        className="col-span-full"
      />
      <CategoryInput
        label="Category"
        value={expenditure.category}
        className="col-span-full"
        onChange={updater("category")}
      />
      <TagsDisplayInput
        label="tags"
        className="col-span-full"
        tags={expenditure.tags}
        onChange={updater("tags")}
      />
    </div>
  );
}
