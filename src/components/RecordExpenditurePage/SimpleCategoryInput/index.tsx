import classNames from "classnames";
import { useState } from "react";
import { CategoryWithId } from "../../../domain/expenditure";
import useSearchCategory from "../../../hooks/useSearchCategory";
import LoadingSpinner from "../../LoadingSpinner";
import CreateCategoryModal from "./CreateCategoryModal";
import SimpleAddCategoryButton from "./SimpleAddCategoryButton";
import SimpleCategoryItem from "./SimpleCategoryItem";

type Props = {
  className?: string;
  category?: string;
  onChange: (category: CategoryWithId) => void;
};
export default function SimpleCategoryInput({
  className,
  category: selectedCategoryId,
  onChange,
}: Props) {
  const { loading, results, refetch } = useSearchCategory("");
  const [modalOpened, setModalOpened] = useState(false);
  const onModalClose = (created?: boolean) => {
    setModalOpened(false);
    if (created) refetch();
  };

  return (
    <>
      <div
        className={classNames(
          "grid grid-cols-2 grid-row-[repeat(auto-fit,32px)] gap-2 flex-nowrap snap-y snap-mandatory overflow-x-auto overflow-y-visible",
          className
        )}
      >
        {loading && <LoadingSpinner />}
        {results?.map((category) => (
          <SimpleCategoryItem
            key={category.id}
            category={category}
            onClick={() => onChange(category)}
            className="snap-start h-min"
            selected={category.id === selectedCategoryId}
          />
        ))}
        <SimpleAddCategoryButton onClick={() => setModalOpened(true)} />
      </div>
      <CreateCategoryModal opened={modalOpened} onClose={onModalClose} />
    </>
  );
}
