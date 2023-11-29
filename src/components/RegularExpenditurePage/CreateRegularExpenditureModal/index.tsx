import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaTimes } from "react-icons/fa";

import { createUpdater } from "../../../utils/objects";
import Modal from "../../Modal";
import {
  DEFAULT_EXPENDITURE,
  RegularExpenditure,
  expenditureDatabase,
} from "../../../domain/expenditure";
import AmountInput from "../../AmountInput";
import { formatNumberAsAmount } from "../../../utils/strings";
import CategoryInput from "../../CategoryInput";
import TagsInput from "../../TagsInput";
import {
  DEFAULT_REGULAR_EXPENDITURE_INTERVAL_SETTINGS,
  RegularExpenditureInterval,
} from "../../../domain/regular-expenditure";
import RepeatIntervalForm from "./RepeatIntervalForm";
import Button from "../../Button";
import TextInput from "../../TextInput";

type Props = {
  onClose: () => void;
  opened?: boolean;
  onCreate?: () => void;
};

const isFormValid = (expenditure: RegularExpenditure): boolean => {
  const { repeat, amount, category, name } = expenditure;
  if (!amount || !category || !name) return false;
  switch (repeat.interval) {
    case RegularExpenditureInterval.Daily:
      return true;
    case RegularExpenditureInterval.Weekly:
      return repeat.weekdays.length > 0;
    case RegularExpenditureInterval.Monthly:
    case RegularExpenditureInterval.Yearly:
      return repeat.days.length > 0;
    default:
      return false;
  }
};
const DEFAULT_FORM_VALUE: RegularExpenditure = {
  ...DEFAULT_EXPENDITURE,
  repeat: DEFAULT_REGULAR_EXPENDITURE_INTERVAL_SETTINGS.daily,
};
export default function CreateRegularExpenditureModal({
  onClose,
  onCreate,
  opened,
}: Props) {
  const [form, setForm] = useState(DEFAULT_FORM_VALUE);
  const updater = createUpdater(form, setForm);
  if (!opened) return null;

  const onCreateRegularExpenditure = () => {
    return expenditureDatabase
      .createExpenditure(form)
      .then((id) => {
        if (!id) throw new Error("failed to create regular expenditure");
        toast.success("regular expenditure created");
        onClose();
        onCreate?.();
      })
      .catch((e) => {
        toast.error(e);
      });
  };

  return (
    <Modal onClose={onClose} title="Create regular expenditure">
      <div className="flex-1 overflow-y-auto">
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
              onClick={onCreateRegularExpenditure}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
