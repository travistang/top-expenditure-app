import { useMemo, useState } from "react";
import { FaDollarSign, FaList, FaPercentage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Currency } from "../../../domain/currency";
import { CategoryWithId, ExpenditureWithId } from "../../../domain/expenditure";
import {
  groupExpendituresByCategory,
  mapRecordValue,
  total,
} from "../../../domain/expenditure-statistics";
import { Routes } from "../../../routes";
import { formatNumberAsAmount } from "../../../utils/strings";
import Button from "../../Button";
import CategoryIcon from "../../CategoryItem/CategoryIcon";
import List from "../../List/list";
import Widget from "../../Widget";

type Props = {
  categories: CategoryWithId[];
  expenditures: ExpenditureWithId[];
  currency: Currency;
};
export default function ExpenditureByCategoryWidget({
  categories,
  expenditures,
  currency,
}: Props) {
  const [showingPercentage, setShowingPercentage] = useState(false);
  const navigate = useNavigate();
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

  const toCategoryDetails = (id: string) => {
    navigate(`${Routes.CategoryList}#${id}`);
  };
  return (
    <Widget icon={FaList} title="Categories" className="col-span-4">
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
            onClick={() => toCategoryDetails(group.category.id)}
            className="snap-start flex items-center gap-2 px-2 py-1 justify-between border-b-gray-500 border-b h-min"
          >
            <div className="flex items-center gap-1 overflow-hidden text-xs">
              <CategoryIcon className="h-8 w-8" category={group.category} />
              {group.category.name}
            </div>
            <span className="text-xs font-bold whitespace-nowrap">
              {showingPercentage
                ? `${((group.total / (grandTotal || 1)) * 100).toFixed(0)}%`
                : formatNumberAsAmount(group.total, currency)}
            </span>
          </div>
        )}
      </List>
      <Button
        className="text-xs"
        onClick={() => setShowingPercentage(!showingPercentage)}
        text={showingPercentage ? "Show amount" : "Show percentage"}
        icon={showingPercentage ? FaDollarSign : FaPercentage}
      />
    </Widget>
  );
}
