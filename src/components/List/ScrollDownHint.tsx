import classNames from "classnames";
import { forwardRef, useEffect, useRef } from "react";
import { FaArrowDown } from "react-icons/fa";

function ScrollDownHint(_: any, ref: React.ForwardedRef<HTMLDivElement>) {
  const containerRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    setTimeout(() => {
      containerRef.current?.setAttribute("style", "opacity: 0;");
    }, 4000);
  }, []);

  return (
    <div className="flex items-center justify-center sticky bottom-0">
      <div
        ref={containerRef}
        className={classNames(
          "transition-all animate-bounce flex-shrink-0 h-8 aspect-square rounded-full p-1 flex items-center justify-center",
          "border border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200"
        )}
      >
        <FaArrowDown />
      </div>
    </div>
  );
}

export default forwardRef(ScrollDownHint);
