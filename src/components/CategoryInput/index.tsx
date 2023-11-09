import { useState } from "react";
import InputBase from "../InputBase";
import Modal from "../Modal";
import CategoryModal from "./CategoryModal";

type Props = {
  label?: string;
  value: string;
  onChange: (cat: string) => void;
  className?: string;
};
export default function CategoryInput({
  label,
  value,
  onChange,
  className,
}: Props) {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <>
      <InputBase
        onClick={() => setModalOpened(true)}
        label={label}
        className={className}
      >
        <span className="text-gray-800">{value}</span>
      </InputBase>
      {modalOpened && (
        <Modal onClose={() => setModalOpened(false)}>
          <CategoryModal onChange={onChange} />
        </Modal>
      )}
    </>
  );
}
