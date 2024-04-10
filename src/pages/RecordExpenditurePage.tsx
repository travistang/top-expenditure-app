import classNames from "classnames";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaPen } from "react-icons/fa";
import Button from "../components/Button";
import DateInput from "../components/DateInput";
import DigitInputGroup from "../components/DigitInputGroup";
import InputSectionToggle from "../components/RecordExpenditurePage/InputSectionToggle";
import SimpleCategoryInput from "../components/RecordExpenditurePage/SimpleCategoryInput";
import TagsInput from "../components/TagsInput";
import TextInput from "../components/TextInput";
import {
  CategoryWithId,
  DEFAULT_EXPENDITURE,
  expenditureDatabase,
} from "../domain/expenditure";
import useExpenditureForm from "../hooks/useExpenditureForm";

export default function RecordExpenditurePage() {
  const [showNumPad, setShowNumPad] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { formValue, updateField, isFormValid, reset, setFormValue } =
    useExpenditureForm(() => ({ ...DEFAULT_EXPENDITURE, date: Date.now() }));
  const onCategorySelected = (category: CategoryWithId) => {
    setFormValue({
      ...formValue,
      category: category.id,
      name: category.name,
    });
  };

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
      <InputSectionToggle
        showingInfoSection={showMore}
        onChange={setShowMore}
      />
      <div
        className={classNames(
          "grid grid-cols-2 transition-transform w-[200vw]",
          showMore ? "-translate-x-[100vw]" : "translate-x-0"
        )}
      >
        <div className="px-4 w-screen">
          <SimpleCategoryInput
            className={classNames(
              "overflow-y-auto transition-[max-height] flex-shrink-0",
              "max-h-[calc(16px+8*32px)]"
            )}
            category={formValue.category ?? undefined}
            onChange={onCategorySelected}
          />
        </div>
        <div
          className={classNames(
            "flex flex-col items-stretch gap-2 px-4 w-screen"
          )}
        >
          <TextInput
            label="Name"
            value={formValue.name}
            onChange={updateField("name")}
          />
          <DateInput
            label="Time"
            date={formValue.date}
            onChange={updateField("date")}
          />

          <TagsInput
            label="Tags"
            tags={formValue.tags}
            onChange={updateField("tags")}
          />
        </div>
      </div>
      <div id="keypad-portal" className="contents" />
      <div
        className={classNames(
          "absolute bottom-0 w-full left-0 mb-4 bg-normal flex items-center justify-center duration-300 transition-all",
          showNumPad && "translate-y-full opacity-0"
        )}
      >
        <Button
          disabled={!isFormValid}
          icon={!isFormValid ? FaPen : FaCheck}
          onClick={onCreateExpenditure}
          className={classNames(
            " text-gray-200 h-20 aspect-square duration-300 transition-transform",
            isFormValid ? "bg-green-500 active:bg-green-700" : "bg-gray-400"
          )}
        />
      </div>
    </div>
  );
}
