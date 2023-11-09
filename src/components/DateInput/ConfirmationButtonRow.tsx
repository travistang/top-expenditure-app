import classNames from "classnames";
import Button from "../Button";
import { FaCheck, FaClock, FaTimes } from "react-icons/fa";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  onSetToNow: () => void;
  className?: string;
};
export default function ConfirmationButtonRow({
  onCancel,
  onConfirm,
  onSetToNow,
  className,
}: Props) {
  return (
    <div
      className={classNames(
        "flex items-center justify-between py-2 transition-all duration-300"
      )}
    >
      <Button
        text="Now"
        icon={FaClock}
        onClick={onSetToNow}
        className="h-12 font-bold uppercase"
      />
      <div className="flex items-center gap-2">
        <Button
          icon={FaTimes}
          className="h-12 w-min aspect-square justify-self-end bg-red-500 active:bg-red-700"
          onClick={onCancel}
        />
        <Button
          icon={FaCheck}
          className="h-12 w-min aspect-square justify-self-end bg-green-500 active:bg-green-700"
          onClick={onConfirm}
        />
      </div>
    </div>
  );
}
