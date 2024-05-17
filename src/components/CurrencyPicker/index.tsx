import classNames from "classnames";
import { useState } from "react";
import { createPortal } from "react-dom";
import { CURRENCIES, CURRENCY_NAMES, Currency } from "../../domain/currency";
import Modal from "../Modal";

type Props = {
  className?: string;
  currency: Currency;
  onChange: (currency: Currency) => void;
};
export default function CurrencyPicker({
  className,
  currency,
  onChange,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onSelectCurrency = (currency: Currency) => {
    onChange(currency);
    setIsModalOpen(false);
  };
  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={classNames("rounded-lg px-2", className)}
      >
        {CURRENCY_NAMES[currency]}
      </button>
      {isModalOpen &&
        createPortal(
          <Modal onClose={() => setIsModalOpen(false)} title="Select currency">
            <div className="flex items-center flex-wrap gap-2">
              {Object.values(CURRENCIES).map((c) => (
                <button
                  key={c}
                  onClick={() => onSelectCurrency(c)}
                  className={classNames(
                    "rounded-lg aspect-square flex items-center justify-center h-20 flex-1 min-w-[30vw]",
                    currency === c
                      ? "bg-green-500 text-white"
                      : "bg-gray-500/50"
                  )}
                >
                  {CURRENCY_NAMES[c]}
                </button>
              ))}
            </div>
          </Modal>,
          document.body
        )}
    </>
  );
}
