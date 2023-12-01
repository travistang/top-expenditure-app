import { ExpenditureWithId } from "../../domain/expenditure";
import { Updater } from "../../utils/objects";
import AmountDisplayInput from "../AmountInput/AmountDisplayInput";
import CategoryInput from "../CategoryInput";
import TagsDisplayInput from "../TagsInput/TagsDisplayInput";
import TextDisplayInput from "../TextInput/TextDisplayInput";

type Props = {
  expenditure: ExpenditureWithId;
  updater: Updater<ExpenditureWithId>;
};
export default function ExpenditureDetailForm({ expenditure, updater }: Props) {
  return (
    <div className="grid grid-cols-6 gap-2">
      <TextDisplayInput
        label="Name"
        className="col-span-3"
        value={expenditure.name}
        onChange={updater("name")}
      />
      <AmountDisplayInput
        className="col-span-3 self-end"
        amount={expenditure.amount}
        onChange={updater("amount")}
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
