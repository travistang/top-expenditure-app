import toast from "react-hot-toast";
import {
  DEFAULT_EXPENDITURE,
  expenditureDatabase,
} from "../domain/expenditure";
import useExpenditureForm from "../hooks/useExpenditureForm";
import { useState } from "react";
import classNames from "classnames";
import DigitInputGroup from "../components/DigitInputGroup";
import TextInput from "../components/TextInput";
import DateInput from "../components/DateInput";
import CategoryInput from "../components/CategoryInput";
import TagsInput from "../components/TagsInput";
import Button from "../components/Button";
import { FaCheck, FaPen } from "react-icons/fa";

export default function RecordExpenditurePage() {
  const [showNumPad, setShowNumPad] = useState(false);
  const { formValue, updateField, isFormValid, reset } =
    useExpenditureForm(DEFAULT_EXPENDITURE);

  const onCreateExpenditure = () => {
    expenditureDatabase
      .createExpenditure(formValue)
      .then(() => toast.success("Expenditure recorded"))
      .then(reset)
      .catch(() => toast.error("Failed to record expenditure"));
  };

  return (
    <div
      className={classNames(
        "flex flex-col flex-1 gap-2 items-stretch bg-transparent overflow-hidden relative pb-4"
      )}
    >
      <DigitInputGroup
        showNumPad={showNumPad}
        toggleNumPad={() => setShowNumPad(!showNumPad)}
        value={formValue.amount}
        keypadPortalId="page"
        onChange={updateField("amount")}
      />
      <div
        className={classNames(
          "duration-300 transition-[opacity,transform,margin] grid grid-cols-6 gap-2 px-4",
          showNumPad ? "opacity-0 -translate-x-[100vw] " : "opacity-100"
        )}
      >
        <TextInput
          label="Name"
          value={formValue.name}
          className="col-span-full"
          onChange={updateField("name")}
        />
        <DateInput
          label="Time"
          date={formValue.date}
          className="col-span-4"
          onChange={updateField("date")}
        />
        <CategoryInput
          className="col-span-2"
          label="Category"
          value={formValue.category}
          onChange={updateField("category")}
        />
        <TagsInput
          label="Tags"
          className="col-span-full w-full"
          tags={formValue.tags}
          onChange={updateField("tags")}
        />
      </div>
      <div id="keypad-portal" className="contents" />
      <div
        className={classNames(
          "absolute bottom-0 w-full mb-4 bg-normal flex items-center justify-center duration-300 transition-all",
          showNumPad && "translate-y-full opacity-0"
        )}
      >
        <Button
          disabled={!isFormValid}
          icon={!isFormValid ? FaPen : FaCheck}
          onClick={onCreateExpenditure}
          className={classNames(
            " text-gray-200 h-20 aspect-square duration-300 transition-all",
            isFormValid ? "bg-green-500 active:bg-green-700" : "bg-gray-400"
          )}
        />
      </div>
    </div>
  );
}
