import { MonthlyRegularExpenditureInterval } from "../../../../domain/regular-expenditure";
import DayPicker from "./DayPicker";
import RepeatIntervalFormBase from "./RepeatIntervalFormBase";

type Props = {
  settings: MonthlyRegularExpenditureInterval;
  onChange: (settings: MonthlyRegularExpenditureInterval) => void;
};
export default function MonthlyRepeatIntervalForm({
  settings,
  onChange,
}: Props) {
  return (
    <RepeatIntervalFormBase settings={settings} onChange={onChange}>
      {({ settings, updater }) => (
        <>
          <span className="text-xs font-bold">Days to repeat on</span>
          <DayPicker
            numDays={31}
            selectedDays={settings.days}
            onChange={updater("days")}
          />
        </>
      )}
    </RepeatIntervalFormBase>
  );
}
