import classNames from "classnames";
import { RegularExpenditureSettings } from "../../../../domain/regular-expenditure";
import DateInput from "../../../DateInput";
import { Updater, createUpdater } from "../../../../utils/objects";

type RepeatIntervalFormProps<T extends RegularExpenditureSettings> = {
  settings: T;
  updater: Updater<T>;
};
type Props<T extends RegularExpenditureSettings> = {
  settings: T;
  onChange: (settings: T) => void;
  children?: (props: RepeatIntervalFormProps<T>) => React.ReactNode;
};
export default function RepeatIntervalFormBase<
  T extends RegularExpenditureSettings
>({ settings, onChange, children }: Props<T>) {
  const updater = createUpdater(settings, onChange);
  return (
    <div className={classNames("flex flex-col items-stretch")}>
      <DateInput
        label="Last repeat in"
        nullable
        date={settings.endDate}
        onChange={updater("endDate")}
      />
      {children?.({ settings, updater })}
    </div>
  );
}
