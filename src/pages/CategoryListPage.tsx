import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import CategoryItem from "../components/CategoryItem";
import List from "../components/List/list";
import IconAndLinePlaceholder from "../components/Placeholders/IconAndLinePlaceholder";
import TextInput from "../components/TextInput";
import { expenditureDatabase } from "../domain/expenditure";
import useSearch from "../hooks/useSearch";
import CategoryDetailPage from "./CategoryDetailPage";

const searchCategoryFunc = (searchString: string) =>
  expenditureDatabase.searchCategories(searchString);

const onSelectCategory = (id: string) => () => {
  window.location.hash = id;
};

export default function CategoryListPage() {
  const [searchString, setSearchString] = useState("");
  const { results, loading } = useSearch(searchString, searchCategoryFunc);

  return (
    <div className="flex flex-col items-stretch gap-2 flex-1 px-2 overflow-y-hidden">
      <CategoryDetailPage />
      <TextInput
        className="flex-shrink-0"
        value={searchString}
        onChange={setSearchString}
        icon={FaSearch}
        placeholder="Search categories..."
      />
      <List
        className="gap-2 overflow-y-auto pb-16"
        numPlaceholder={3}
        placeholder={<IconAndLinePlaceholder className="h-14" />}
        items={results}
        loading={loading}
      >
        {(category) => (
          <CategoryItem
            key={category.id}
            onClick={onSelectCategory(category.id)}
            category={category}
          />
        )}
      </List>
    </div>
  );
}
