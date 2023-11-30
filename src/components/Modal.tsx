import classNames from "classnames";
import { useEffect, useState, createContext } from "react";
import { FaTimes } from "react-icons/fa";
import { createPortal } from "react-dom";
import Button from "./Button";

type Props = {
  children?: React.ReactNode;
  onClose: () => void;
  className?: string;
  title?: string;
};

export const modalContext = createContext({
  onClose: () => {},
});

export default function Modal({ title, children, onClose, className }: Props) {
  const [appearing, setAppearing] = useState(false);
  useEffect(() => {
    setAppearing(true);
  }, []);

  const onCloseWithAnimation = () => {
    setAppearing(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  return createPortal(
    <div
      onClick={onCloseWithAnimation}
      className={classNames(
        "transition-all duration-300 inset-0 fixed z-50 flex flex-col justify-end items-center ",
        appearing && "backdrop-blur-md bg-gray-400/50 dark:bg-gray-500/50"
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={classNames(
          "rounded-t-3xl shadow-xl p-2 w-full min-h-[33vh] overflow-hidden bg-normal transition-all duration-300",
          !appearing && "translate-y-full",
          className
        )}
      >
        <div className="flex justify-end items-center py-1 overflow-hidden sticky top-0">
          {title && (
            <span className="text-normal flex-1 text-ellipsis">{title}</span>
          )}
          <Button icon={FaTimes} onClick={onCloseWithAnimation} />
        </div>
        <modalContext.Provider value={{ onClose: onCloseWithAnimation }}>
          {children}
        </modalContext.Provider>
      </div>
    </div>,
    document.getElementById("page")!
  );
}
