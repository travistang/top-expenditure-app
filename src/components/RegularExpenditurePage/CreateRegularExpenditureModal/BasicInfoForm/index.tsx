import { RegularExpenditure } from "../../../../domain/expenditure";
import { Updater } from "../../../../utils/objects";
import AmountInput from "../../../AmountInput";
import CategoryInput from "../../../CategoryInput";
import CurrencyPicker from "../../../CurrencyPicker";
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
        currency={form.currency}
        className="col-span-2"
        amount={form.amount}
        onChange={updater("amount")}
      />

      <CategoryInput
        value={form.category}
        className="col-span-3"
        label="Category"
        onChange={updater("category")}
      />
      <div className="flex flex-col col-span-3 gap-2">
        <span className="text-xs font-bold">Currency</span>
        <CurrencyPicker
          className="w-min h-10 bg-gray-500/50"
          currency={form.currency}
          onChange={updater("currency")}
        />
      </div>
      <TagsInput
        tags={form.tags}
        className="col-span-full"
        label="Tags"
        onChange={updater("tags")}
      />
    </div>
  );
}
