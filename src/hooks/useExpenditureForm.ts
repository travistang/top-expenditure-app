import { useState } from "react";
import { Expenditure } from "../domain/expenditure";

export default function useExpenditureForm(
  defaultExpenditureValue: Expenditure
) {
  const [formValue, setFormValue] = useState(defaultExpenditureValue);

  const updateField =
    <K extends keyof Expenditure>(field: K) =>
    (value: Expenditure[K]) => {
      setFormValue({ ...formValue, [field]: value });
    };

  const reset = () => setFormValue(defaultExpenditureValue);
  const isFormValid =
    !!formValue.name && !!formValue.category && formValue.amount > 0;

  return {
    formValue,
    updateField,
    reset,
    isFormValid,
  };
}
