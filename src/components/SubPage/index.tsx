import classNames from "classnames";
import { FaArrowLeft } from "react-icons/fa";
import Button from "../Button";

type Props = {
  onClose?: () => void;
  title?: string;
  inView?: boolean;
  children: React.ReactNode;
  className?: string;
};
export default function SubPage({
  inView,
  onClose,
  title,
  children,
  className,
}: Props) {
  return (
    <div
      className={classNames(
        "absolute top-0 left-0 bottom-16 w-full transition-transform duration-150 flex flex-col items-stretch overflow-hidden z-20 bg-normal",
        inView ? "translate-x-0" : "translate-x-[100vw]",
        className
      )}
    >
      <div className="flex items-center gap-2 p-2 bg-normal z-20 justify-between">
        <Button
          icon={FaArrowLeft}
          color="transparent"
          className="rounded-full h-full"
          onClick={onClose}
          text="Back"
        />
        {title && <span className="text-sm">{title}</span>}
      </div>
      <div className="overflow-hidden px-2 flex-1 gap-2 flex flex-col">
        {children}
      </div>
    </div>
  );
}
