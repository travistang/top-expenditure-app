import classNames from "classnames";
import { DateSelectionModalState } from ".";

type Props = {
  children: React.ReactNode;
  currentMode: DateSelectionModalState;
  representingMode: DateSelectionModalState;
};
export default function DatePickerGroupContainer({
  children,
  currentMode,
  representingMode,
}: Props) {
  return (
    <div
      className={classNames(
        "flex flex-col items-stretch gap-2 duration-300 transition-all px-2",
        currentMode !== representingMode && "opacity-0"
      )}
    >
      {children}
    </div>
  );
}
