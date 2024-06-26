import { IncomeWithId } from "../../../../domain/income";
import { Updater } from "../../../../utils/objects";
import AmountDisplayInput from "../../../AmountInput/AmountDisplayInput";
import DateInput from "../../../DateInput";
import TextDisplayInput from "../../../TextInput/TextDisplayInput";
import RepeatIntervalDisplayInput from "../../CreateRegularExpenditureModal/RepeatIntervalForm/RepeatIntervalDisplayInput";

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
        onChange={updater("amount")}
        currency={income.currency}
        amount={income.amount}
        className="col-span-full"
      />
      <DateInput
        nullable
        date={income.startDate}
        onChange={updater("startDate")}
        className="col-span-6"
        label="Start at"
      />
      <DateInput
        nullable
        date={income.endDate}
        onChange={updater("endDate")}
        className="col-span-6"
        label="Ends at"
      />
      <RepeatIntervalDisplayInput
        className="col-span-full"
        settings={income.repeat}
        onChange={updater("repeat")}
      />
    </div>
  );
}
