import { DailyRegularExpenditureInterval } from "../../../../domain/regular-expenditure";
import RepeatIntervalFormBase from "./RepeatIntervalFormBase";

type Props = {
  settings: DailyRegularExpenditureInterval;
  onChange: (form: DailyRegularExpenditureInterval) => void;
};
export default function DailyRepeatIntervalForm({ settings, onChange }: Props) {
  return <RepeatIntervalFormBase settings={settings} onChange={onChange} />;
}
