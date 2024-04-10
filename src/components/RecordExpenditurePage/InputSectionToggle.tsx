import TabInput from "../TabInput";

type InputSectionValue = "category" | "info";

const INPUT_SECTION_OPTIONS = [
  {
    value: "category" as InputSectionValue,
    label: "Category",
  },
  {
    value: "info" as InputSectionValue,
    label: "Info",
  },
];

type Props = {
  showingInfoSection: boolean;
  onChange: (showInfoSection: boolean) => void;
};
export default function InputSectionToggle({
  showingInfoSection,
  onChange,
}: Props) {
  return (
    <TabInput
      className="mx-4 mb-4"
      itemClassName="h-12"
      value={showingInfoSection ? "info" : "category"}
      onChange={(v) => onChange(v === "info")}
      options={INPUT_SECTION_OPTIONS}
    />
  );
}
