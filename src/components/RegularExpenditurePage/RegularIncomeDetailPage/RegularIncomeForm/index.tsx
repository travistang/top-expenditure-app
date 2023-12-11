import { IncomeWithId } from "../../../../domain/income";
import { Updater } from "../../../../utils/objects";
import AmountDisplayInput from "../../../AmountInput/AmountDisplayInput";
import TextDisplayInput from "../../../TextInput/TextDisplayInput";

type Props = {
  income: IncomeWithId;
  updater: Updater<IncomeWithId>;
};
export default function RegularIncomeForm({ income, updater }: Props) {
  return (
    <div className="grid grid-cols-12 gap-2">
      <TextDisplayInput
        value={income.name}
        onChange={updater("name")}
        className="col-span-full"
      />
      <AmountDisplayInput
        amount={income.amount}
        onChange={updater("amount")}
        className="col-span-full"
      />
    </div>
  );
}
