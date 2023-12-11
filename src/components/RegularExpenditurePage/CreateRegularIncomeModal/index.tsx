import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaTimes } from "react-icons/fa";
import { expenditureDatabase } from "../../../domain/expenditure";
import { RegularIncome } from "../../../domain/income";
import { DEFAULT_REPEAT_SETTINGS, isValidRepeat } from "../../../domain/repeat";
import { createUpdater } from "../../../utils/objects";
import { formatNumberAsAmount } from "../../../utils/strings";
import AmountInput from "../../AmountInput";
import Button from "../../Button";
import DateInput from "../../DateInput";
import Modal from "../../Modal";
import TextInput from "../../TextInput";
import RepeatIntervalForm from "../CreateRegularExpenditureModal/RepeatIntervalForm";

type Props = {
  onClose: () => void;
  opened?: boolean;
  onCreate?: () => void;
};
const DEFAULT_FORM_VALUE: RegularIncome = {
  name: "",
  amount: 0,
  repeat: DEFAULT_REPEAT_SETTINGS.monthly,
};

const isFormValid = (form: RegularIncome) => {
  return !!form.name && !!form.amount && isValidRepeat(form.repeat);
};

export default function CreateRegularIncomeModal({
  onClose,
  opened,
  onCreate,
}: Props) {
  const [form, setForm] = useState(DEFAULT_FORM_VALUE);
  const updater = createUpdater(form, setForm);
  const onCreateRegularIncome = () => {
    return expenditureDatabase
      .createIncome(form)
      .then((id) => {
        if (!id) throw new Error("failed to create regular income");
        toast.success("regular income created");
        onClose();
        onCreate?.();
      })
      .catch((e) => {
        toast.error(e);
      });
  };
  if (!opened) return null;
  return (
    <Modal onClose={onClose} title="Create regular income">
      <div className="grid grid-cols-12 gap-2">
        <TextInput
          className="col-span-7"
          label="Name"
          value={form.name}
          onChange={updater("name")}
        />
        <AmountInput
          amount={form.amount}
          onChange={updater("amount")}
          className="col-span-5"
          label="Amount"
          formatter={formatNumberAsAmount}
        />
        <DateInput
          nullable
          date={form.startDate}
          onChange={updater("startDate")}
          className="col-span-6"
          label="Start at"
        />
        <DateInput
          nullable
          date={form.endDate}
          onChange={updater("endDate")}
          className="col-span-6"
          label="Ends at"
        />
        <RepeatIntervalForm
          className="col-span-full"
          settings={form.repeat}
          onChange={updater("repeat")}
        />
        <div className="flex items-center justify-end gap-2 col-span-full sticky bottom-0">
          <Button
            className="aspect-square h-12"
            icon={FaTimes}
            color="gray"
            onClick={onClose}
          />
          <Button
            disabled={!isFormValid(form)}
            className="aspect-square h-12"
            icon={FaCheck}
            color="green"
            onClick={onCreateRegularIncome}
          />
        </div>
      </div>
    </Modal>
  );
}
