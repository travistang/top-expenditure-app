import { RegularExpenditure } from "../../../../domain/expenditure";
import { Updater } from "../../../../utils/objects";
import { formatNumberAsAmount } from "../../../../utils/strings";
import AmountInput from "../../../AmountInput";
import CategoryInput from "../../../CategoryInput";
import TagsInput from "../../../TagsInput";
import TextInput from "../../../TextInput";

type Props = {
  form: RegularExpenditure;
  updater: Updater<RegularExpenditure>;
};
export default function BasicInfoForm({ form, updater }: Props) {
  return (
    <div className="grid grid-cols-6 gap-2">
      <TextInput
        label="Name"
        className="col-span-4"
        value={form.name}
        onChange={updater("name")}
      />
      <AmountInput
        label="Amount"
        className="col-span-2"
        amount={form.amount}
        formatter={formatNumberAsAmount}
        onChange={updater("amount")}
      />

      <CategoryInput
        value={form.category}
        className="col-span-full"
        label="Category"
        onChange={updater("category")}
      />
      <TagsInput
        tags={form.tags}
        className="col-span-full"
        label="Tags"
        onChange={updater("tags")}
      />
    </div>
  );
}
