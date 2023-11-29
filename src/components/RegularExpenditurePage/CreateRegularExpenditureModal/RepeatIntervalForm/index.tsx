import classNames from "classnames";
import {
  DEFAULT_REGULAR_EXPENDITURE_INTERVAL_SETTINGS,
  RegularExpenditureInterval,
  RegularExpenditureSettings,
} from "../../../../domain/regular-expenditure";
import RepeatIntervalTypePicker from "../RepeatIntervalTypePicker";
import DailyRepeatIntervalForm from "./DailyRepeatIntervalForm";
import WeeklyRepeatIntervalForm from "./WeeklyRepeatIntervalForm";
import MonthlyRepeatIntervalForm from "./MonthlyRepeatIntervalForm";
import YearRepeatIntervalForm from "./YearRepeatIntervalForm";

type Props = {
  settings: RegularExpenditureSettings;
  onChange: (settings: RegularExpenditureSettings) => void;
  className?: string;
};

const getFormOnIntervalChange = (
  currentSettings: RegularExpenditureSettings,
  newInterval: RegularExpenditureInterval
): RegularExpenditureSettings => {
  if (currentSettings.interval === newInterval) return currentSettings;
  const { endDate } = currentSettings;
  return {
    ...DEFAULT_REGULAR_EXPENDITURE_INTERVAL_SETTINGS[newInterval],
    endDate,
  };
};
export default function RepeatIntervalForm({
  settings,
  onChange,
  className,
}: Props) {
  const { interval } = settings;
  const onIntervalChange = (interval: RegularExpenditureInterval) =>
    onChange(getFormOnIntervalChange(settings, interval));

  return (
    <div
      className={classNames(
        "flex flex-col items-stretch gap-2 overflow-y-auto",
        className
      )}
    >
      <RepeatIntervalTypePicker
        type={settings.interval}
        onChange={onIntervalChange}
      />
      {interval === RegularExpenditureInterval.Daily && (
        <DailyRepeatIntervalForm settings={settings} onChange={onChange} />
      )}
      {interval === RegularExpenditureInterval.Weekly && (
        <WeeklyRepeatIntervalForm settings={settings} onChange={onChange} />
      )}
      {interval === RegularExpenditureInterval.Monthly && (
        <MonthlyRepeatIntervalForm settings={settings} onChange={onChange} />
      )}
      {interval === RegularExpenditureInterval.Yearly && (
        <YearRepeatIntervalForm settings={settings} onChange={onChange} />
      )}
    </div>
  );
}
