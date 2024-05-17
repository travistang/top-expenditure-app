import { Currency } from "../../../../domain/currency";
import TabInput from "../../../TabInput";

type Props = {
  currency: Currency;
  onChange: (currency: Currency) => void;
};
const CURRENCY_OPTIONS = [
  {
    value: "EUR" as Currency,
    label: "EUR",
  },
  {
    value: "GBP" as Currency,
    label: "GBP",
  },
  {
    value: "HKD" as Currency,
    label: "HKD",
  },
];
export default function CurrencyTab({ currency, onChange }: Props) {
  return (
    <TabInput
      className="mx-4 mb-4"
      itemClassName="h-12"
      value={currency}
      onChange={(v) => onChange(v as Currency)}
      options={CURRENCY_OPTIONS}
    />
  );
}
