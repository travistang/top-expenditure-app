import {
  Weekday,
  WeeklyRegularExpenditureInterval,
} from "../../../../domain/regular-expenditure";
import { toggle } from "../../../../utils/array";
import ButtonGroup from "../../../ButtonGroup";
import RepeatIntervalFormBase from "./RepeatIntervalFormBase";

type Props = {
  settings: WeeklyRegularExpenditureInterval;
  onChange: (form: WeeklyRegularExpenditureInterval) => void;
};
const Weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

export default function WeeklyRepeatIntervalForm({
  onChange,
  settings,
}: Props) {
  return (
    <RepeatIntervalFormBase settings={settings} onChange={onChange}>
      {({ settings, updater }) => (
        <>
          <span className="text-xs font-bold">Repeat on weekdays</span>
          <ButtonGroup
            buttons={Weekdays.map((weekday, i) => ({
              id: i.toString(),
              color: settings.weekdays.includes(i as Weekday)
                ? "indigo"
                : undefined,
              text: weekday,
              onClick: () =>
                updater("weekdays")(toggle(settings.weekdays, i as Weekday)),
            }))}
          />
        </>
      )}
    </RepeatIntervalFormBase>
  );
}
