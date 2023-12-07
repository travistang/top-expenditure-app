import classNames from "classnames";
import { Repeat } from "../../../../domain/regular-expenditure";
import DateInput from "../../../DateInput";
import { Updater, createUpdater } from "../../../../utils/objects";

type RepeatIntervalFormProps<T extends Repeat> = {
  settings: T;
  updater: Updater<T>;
};
type Props<T extends Repeat> = {
  settings: T;
  onChange: (settings: T) => void;
  children?: (props: RepeatIntervalFormProps<T>) => React.ReactNode;
};
export default function RepeatIntervalFormBase<T extends Repeat>({
  settings,
  onChange,
  children,
}: Props<T>) {
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
