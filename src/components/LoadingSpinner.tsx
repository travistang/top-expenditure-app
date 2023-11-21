import classNames from "classnames";
import { FaSpinner } from "react-icons/fa";

type Props = {
  className?: string;
};

export default function LoadingSpinner({ className }: Props) {
  return (
    <div
      className={classNames(
        "animate-spin flex items-center justify-center",
        className
      )}
    >
      <FaSpinner />
    </div>
  );
}
