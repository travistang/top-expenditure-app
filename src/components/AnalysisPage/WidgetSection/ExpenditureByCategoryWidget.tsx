import { FaList } from "react-icons/fa";
import Widget from "../../Widget";
import List from "../../List/list";
import CategoryIcon from "../../CategoryItem/CategoryIcon";
import { CategoryWithId, ExpenditureWithId } from "../../../domain/expenditure";
import { useMemo, useState } from "react";
import {
  groupExpendituresByCategory,
  mapRecordValue,
  total,
} from "../../../domain/expenditure-statistics";
import { formatNumberAsAmount } from "../../../utils/strings";

type Props = {
  categories: CategoryWithId[];
  expenditures: ExpenditureWithId[];
};
export default function ExpenditureByCategoryWidget({
  categories,
  expenditures,
}: Props) {
  const [showingPercentage, setShowingPercentage] = useState(false);
  const grandTotal = useMemo(() => total(expenditures), [expenditures]);
  const expendituresByCategory = useMemo(
    () =>
      mapRecordValue(
        groupExpendituresByCategory(categories, expenditures, true),
        ({ expenditures, category }) => ({
          category,
          total: total(expenditures),
        })
      ),
    [categories, expenditures]
  );
  return (
    <Widget
      onClick={() => setShowingPercentage(!showingPercentage)}
      icon={FaList}
      title="Categories"
      className="col-span-4"
    >
      <List
        withScrollDownHint
        noResultMessage="No expenditures this month"
        className="flex flex-col h-32 items-stretch gap-1 overflow-y-auto snap-y"
        items={Object.values(expendituresByCategory).sort(
          (a, b) => b.total - a.total
        )}
      >
        {(group) => (
          <div
            key={group.category.id}
            className="snap-start flex items-center gap-2 px-2 py-1 justify-between border-b-gray-500 border-b h-min"
          >
            <div className="flex items-center gap-1 overflow-hidden text-xs">
              <CategoryIcon className="h-8 w-8" category={group.category} />
              {group.category.name}
            </div>
            <span className="text-xs font-bold whitespace-nowrap">
              {showingPercentage
                ? `${((group.total / (grandTotal || 1)) * 100).toFixed(0)}%`
                : formatNumberAsAmount(group.total)}
            </span>
          </div>
        )}
      </List>
    </Widget>
  );
}
