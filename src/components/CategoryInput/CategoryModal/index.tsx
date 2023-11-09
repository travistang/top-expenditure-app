import { FaPen, FaSearch, FaSpinner } from "react-icons/fa";
import { modalContext } from "../../Modal";
import { useContext, useState } from "react";
import useSearchCategory from "../../../hooks/useSearchCategory";
import classNames from "classnames";
import {
  CategoryWithId,
  expenditureDatabase,
} from "../../../domain/expenditure";
import Button from "../../Button";

type Props = {
  onChange: (selectedCategory: string) => void;
};
export default function CategoryModal({ onChange }: Props) {
  const [searchString, setSearchString] = useState("");
  const { loading, results } = useSearchCategory(searchString);
  const { onClose } = useContext(modalContext);
  const onSelectCategory = (category: CategoryWithId) => {
    setSearchString(category.name);
    onChange(category.name);
    onClose();
  };

  const onCreateCategory = () => {
    const creatingCategory = searchString;
    expenditureDatabase.createCategory(creatingCategory).then(() => {
      onChange(creatingCategory);
      onClose();
    });
  };

  const noSearchResults = !!searchString && !loading && results.length === 0;

  return (
    <>
      <div className="-mx-2 bg-gray-300 dark:bg-gray-400 h-12 flex items-center gap-2">
        {loading ? (
          <FaSpinner className="w-12 animate-spin text-gray-800" />
        ) : (
          <FaSearch className="w-12 text-gray-800" />
        )}
        <input
          placeholder="Search categories..."
          className="flex-1 bg-transparent text-gray-800 border-none outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </div>
      <div
        className={classNames(
          "flex flex-col items-stretch gap-2 py-2 max-h-72 overflow-y-auto",
          loading && "hidden"
        )}
      >
        {noSearchResults && (
          <Button
            text="Create category..."
            onClick={onCreateCategory}
            icon={FaPen}
            className="gap-2 justify-start h-12 hover:bg-gray-500"
          />
        )}
        {results.map((category) => (
          <div
            key={category.id}
            onClick={() => onSelectCategory(category)}
            className={classNames(
              "h-12 flex items-center px-2 py-1 cursor-pointer hover:bg-gray-500 active:bg-gray-700"
            )}
          >
            {category.name}
          </div>
        ))}
      </div>
    </>
  );
}
