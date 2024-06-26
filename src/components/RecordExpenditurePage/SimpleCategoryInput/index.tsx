import classNames from "classnames";
import { useState } from "react";
import { Currency } from "../../../domain/currency";
import { CategoryWithId } from "../../../domain/expenditure";
import useSearchCategory from "../../../hooks/useSearchCategory";
import LoadingSpinner from "../../LoadingSpinner";
import CreateCategoryModal from "./CreateCategoryModal";
import SimpleAddCategoryButton from "./SimpleAddCategoryButton";
import SimpleCategoryItem from "./SimpleCategoryItem";

type Props = {
  className?: string;
  category?: string;
  currency: Currency;
  onChange: (category: CategoryWithId) => void;
};
export default function SimpleCategoryInput({
  className,
  category: selectedCategoryId,
  currency,
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
          "grid grid-cols-2 grid-row-[repeat(auto-fit,32px)] gap-2 flex-nowrap snap-y snap-mandatory",
          className
        )}
      >
        {loading && <LoadingSpinner />}
        {results?.map((category) => (
          <SimpleCategoryItem
            key={category.id}
            category={category}
            currency={currency}
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
