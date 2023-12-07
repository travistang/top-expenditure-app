import { DailyRepeatInterval } from "../../../../domain/repeat";
import RepeatIntervalFormBase from "./RepeatIntervalFormBase";

type Props = {
  settings: DailyRepeatInterval;
  onChange: (form: DailyRepeatInterval) => void;
};
export default function DailyRepeatIntervalForm({ settings, onChange }: Props) {
  return <RepeatIntervalFormBase settings={settings} onChange={onChange} />;
}
