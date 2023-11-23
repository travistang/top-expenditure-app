import classNames from "classnames";
import { useCallback, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { FaCheck } from "react-icons/fa";
import Modal from "../Modal";
import Button from "../Button";

type Props = {
  color?: string;
  onChange: (color: string) => void;
  className?: string;
};

export default function ColorPicker({ className, color, onChange }: Props) {
  const [pickerOpened, setPickerOpened] = useState(false);
  const [selectedColor, setSelectedColor] = useState(color);
  const commitChange = useCallback(() => {
    if (selectedColor && color !== selectedColor) onChange(selectedColor);
    setPickerOpened(false);
  }, [onChange, color, selectedColor]);

  return (
    <>
      <Button
        onClick={() => setPickerOpened(true)}
        className={classNames(
          "aspect-square",
          !color && "border-2 border-gray-800",
          className
        )}
        style={{ backgroundColor: color }}
      />
      {pickerOpened && (
        <Modal
          key="color-picker"
          title="Choose a color"
          onClose={() => setPickerOpened(false)}
        >
          <div className="flex items-stretch gap-2 flex-col">
            <HexColorPicker
              defaultValue={color}
              onChange={setSelectedColor}
              className="w-full"
            />
            <div className="flex items-center gap-2 justify-between">
              <span className="bg-gray-400 dark:bg-gray-700 text-normal font-mono rounded-lg px-2 py-1">
                {selectedColor}
              </span>
              <Button
                icon={FaCheck}
                color="green"
                className="flex-shrink-0 aspect-square h-8"
                onClick={commitChange}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
