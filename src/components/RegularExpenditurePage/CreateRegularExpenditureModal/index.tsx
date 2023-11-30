import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaRedo, FaTag, FaTimes } from "react-icons/fa";

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
import BasicInfoForm from "./BasicInfoForm";
import ButtonGroup from "../../ButtonGroup";

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
enum Page {
  BasicInfo,
  RepeatInfo,
}

export default function CreateRegularExpenditureModal({
  onClose,
  onCreate,
  opened,
}: Props) {
  const [form, setForm] = useState(DEFAULT_FORM_VALUE);
  const [page, setPage] = useState<Page>(Page.BasicInfo);
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
      <div className="flex-1 flex flex-col items-stretch gap-2">
        <ButtonGroup
          className="my-2"
          buttons={[
            {
              text: "Expenditure info",
              icon: FaTag,
              onClick: () => setPage(Page.BasicInfo),
              id: Page.BasicInfo.toString(),
              color: page === Page.BasicInfo ? 'indigo' : undefined,
            },
            {
              text: "Repeat settings",
              icon: FaRedo,
              onClick: () => setPage(Page.RepeatInfo),
              id: Page.RepeatInfo.toString(),
              color: page === Page.RepeatInfo ? 'indigo' : undefined,
            },
          ]}
        />

        {page === Page.BasicInfo && (
          <BasicInfoForm form={form} updater={updater} />
        )}
        {page === Page.RepeatInfo && (
          <RepeatIntervalForm
            settings={form.repeat}
            onChange={updater("repeat")}
          />
        )}

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
    </Modal>
  );
}
