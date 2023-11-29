import classNames from "classnames";
import { RegularExpenditureInterval } from "../../../domain/regular-expenditure";
import ButtonGroup from "../../ButtonGroup";

type Props = {
  type: RegularExpenditureInterval;
  onChange: (type: RegularExpenditureInterval) => void;
  className?: string;
};
const types: RegularExpenditureInterval[] = Object.values(
  RegularExpenditureInterval
);
export default function RepeatIntervalTypePicker({
  type: selectedType,
  onChange,
  className,
}: Props) {
  return (
    <div className={classNames("flex flex-col items-stretch gap-2", className)}>
      <span className="text-xs font-bold">Repeat type</span>
      <ButtonGroup
        buttons={types.map((type) => ({
          id: type,
          text: type,
          onClick: () => onChange(type),
          color: type === selectedType ? "indigo" : undefined,
        }))}
      />
    </div>
  );
}
