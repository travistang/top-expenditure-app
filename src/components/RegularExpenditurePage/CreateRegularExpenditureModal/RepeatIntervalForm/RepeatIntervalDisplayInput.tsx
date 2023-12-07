import { useEffect, useState } from "react";
import classNames from "classnames";
import {
  differenceInDays,
  format,
  isBefore,
  isSameDay,
  startOfDay,
} from "date-fns";
import Widget from "../../../Widget";
import {
  dayDescription,
  dayMonthDescription,
  weekdayDescription,
} from "../../../../utils/date";
import DisplayInputBase from "../../../DisplayInput/DisplayInputBase";
import RepeatIntervalForm from ".";
import { Repeat, RepeatInterval } from "../../../../domain/repeat";

type Props = {
  settings: Repeat;
  onChange: (settings: Repeat) => void;
  className?: string;
};
const repeatFrequencyText = (settings: Repeat) => {
  if (settings.interval === RepeatInterval.Daily) {
    return (
      <>
        This expenditure repeats <b>{settings.interval.toString()}</b>
      </>
    );
  }
  if (settings.interval === RepeatInterval.Weekly) {
    const description = weekdayDescription(settings.weekdays);
    if (description.includes(",")) {
      return (
        <>
          This expenditure repeats on <b>{description}</b> every week.
        </>
      );
    }
    if (description === "everyday") {
      return (
        <>
          This expenditure repeats <b>daily</b>.
        </>
      );
    }
    return (
      <>
        This expenditure repeats on <b>{description}s</b>.
      </>
    );
  }
  if (settings.interval === RepeatInterval.Monthly) {
    return (
      <>
        This expenditure repeats on{" "}
        <b>{settings.days.map(dayDescription).join(",")}</b> every month.
      </>
    );
  }
  if (settings.interval === RepeatInterval.Annually) {
    const sortedDays = settings.days.sort((a, b) => {
      return a.month - b.month || a.day - b.day;
    });
    return (
      <>
        This expenditure repeats on{" "}
        <b>{sortedDays.map(dayMonthDescription).join(", ")}</b> every year.
      </>
    );
  }
};

const endDateText = (endDate?: number): string => {
  if (!endDate) return "";
  const now = Date.now();
  const dayDiff = differenceInDays(endDate, now);
  const isEndDateNear = dayDiff < 5;
  const isEndDateInPast = isBefore(endDate, startOfDay(now));
  if (isEndDateInPast) {
    const dateText = isEndDateNear
      ? `${dayDiff} day(s) ago`
      : `on ${format(endDate, "dd/MM/yyyy")}`;
    return `Last repeat was ${dateText}`;
  }
  if (isSameDay(now, endDate)) return "It will stop repeating after today.";
  const dateText = isEndDateNear
    ? `in ${dayDiff} day(s)`
    : `on ${format(endDate, "dd/MM/yyyy")}`;

  return `Last repeat will be ${dateText}`;
};
export default function RepeatIntervalDisplayInput({
  settings,
  onChange,
  className,
}: Props) {
  const [settingsPlaceholder, setSettingsPlaceholder] = useState(settings);
  useEffect(() => {
    setSettingsPlaceholder(settings);
  }, [settings]);

  const onCommit = () => {
    onChange(settingsPlaceholder);
  };
  const onCancel = () => {
    setSettingsPlaceholder(settings);
  };

  return (
    <div
      className={classNames(
        "flex flex-col items-stretch gap-2 overflow-y-auto",
        className
      )}
    >
      <span className="text-xs font-bold">Repeats</span>

      <DisplayInputBase
        onCommit={onCommit}
        onCancel={onCancel}
        inputComponent={
          <RepeatIntervalForm
            className="col-span-full"
            settings={settingsPlaceholder}
            onChange={setSettingsPlaceholder}
          />
        }
      >
        <Widget className={className}>
          <span className="text-sm">{repeatFrequencyText(settings)}</span>
          {settings.endDate && (
            <span className="text-sm">{endDateText(settings.endDate)}</span>
          )}
        </Widget>
      </DisplayInputBase>
    </div>
  );
}
