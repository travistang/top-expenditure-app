import classNames from "classnames";
import {
  DEFAULT_REPEAT_SETTINGS,
  RepeatInterval,
  Repeat,
} from "../../../../domain/repeat";
import RepeatIntervalTypePicker from "../RepeatIntervalTypePicker";
import DailyRepeatIntervalForm from "./DailyRepeatIntervalForm";
import WeeklyRepeatIntervalForm from "./WeeklyRepeatIntervalForm";
import MonthlyRepeatIntervalForm from "./MonthlyRepeatIntervalForm";
import YearRepeatIntervalForm from "./YearRepeatIntervalForm";

type Props = {
  settings: Repeat;
  onChange: (settings: Repeat) => void;
  className?: string;
};

const getFormOnIntervalChange = (
  currentSettings: Repeat,
  newInterval: RepeatInterval
): Repeat => {
  if (currentSettings.interval === newInterval) return currentSettings;
  const { endDate } = currentSettings;
  return {
    ...DEFAULT_REPEAT_SETTINGS[newInterval],
    endDate,
  };
};
export default function RepeatIntervalForm({
  settings,
  onChange,
  className,
}: Props) {
  const { interval } = settings;
  const onIntervalChange = (interval: RepeatInterval) =>
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
      {interval === RepeatInterval.Daily && (
        <DailyRepeatIntervalForm settings={settings} onChange={onChange} />
      )}
      {interval === RepeatInterval.Weekly && (
        <WeeklyRepeatIntervalForm settings={settings} onChange={onChange} />
      )}
      {interval === RepeatInterval.Monthly && (
        <MonthlyRepeatIntervalForm settings={settings} onChange={onChange} />
      )}
      {interval === RepeatInterval.Annually && (
        <YearRepeatIntervalForm settings={settings} onChange={onChange} />
      )}
    </div>
  );
}
