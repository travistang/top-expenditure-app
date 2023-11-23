import { useEffect, useState } from "react";
import InputBase from "../InputBase";
import Modal from "../Modal";
import CategoryModal from "./CategoryModal";

import { CategoryWithId, expenditureDatabase } from "../../domain/expenditure";

type Props = {
  label?: string;
  value: string;
  onChange: (cat: string) => void;
  className?: string;
};
const getCategoryById = (id: string) => {
  return expenditureDatabase.getCategoryById(id);
};
export default function CategoryInput({
  label,
  value,
  onChange,
  className,
}: Props) {
  const [modalOpened, setModalOpened] = useState(false);
  const [result, setResult] = useState<CategoryWithId | null>(null);
  useEffect(() => {
    getCategoryById(value).then((cat) => setResult(cat ?? null));
  }, [value]);
  const onChangeWithCategory = (cat: CategoryWithId) => onChange(cat.id);
  return (
    <>
      <InputBase
        onClick={() => setModalOpened(true)}
        label={label}
        className={className}
      >
        <span className="text-gray-800">{result?.name ?? ""}</span>
      </InputBase>
      {modalOpened && (
        <Modal onClose={() => setModalOpened(false)}>
          <CategoryModal onChange={onChangeWithCategory} />
        </Modal>
      )}
    </>
  );
}
