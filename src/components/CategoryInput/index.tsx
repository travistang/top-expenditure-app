import { useEffect, useState } from "react";
import Modal from "../Modal";
import CategoryModal from "./CategoryModal";

import { CategoryWithId, expenditureDatabase } from "../../domain/expenditure";
import CategoryItem from "../CategoryItem";
import IconAndLinePlaceholder from "../Placeholders/IconAndLinePlaceholder";
import classNames from "classnames";
import useSearch from "../../hooks/useSearch";
import useFetch from "../../hooks/useFetch";

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
  const { loading, result } = useFetch(value, getCategoryById);
  const onChangeWithCategory = (cat: CategoryWithId) => onChange(cat.id);
  return (
    <>
      <div
        className={classNames("flex flex-col gap-2 items-stretch", className)}
        onClick={() => setModalOpened(true)}
      >
        {label && <span className="text-xs font-bold">{label}</span>}
        {!loading ? (
          <CategoryItem size="small" category={result ?? undefined} />
        ) : (
          <IconAndLinePlaceholder />
        )}
      </div>
      {modalOpened && (
        <Modal onClose={() => setModalOpened(false)}>
          <CategoryModal onChange={onChangeWithCategory} />
        </Modal>
      )}
    </>
  );
}
