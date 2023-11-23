import { useState } from "react";
import {
  CategoryWithId,
  ExpenditureWithId,
  expenditureDatabase,
} from "../domain/expenditure";
import useSearch from "../hooks/useSearch";
import { endOfYear, isSameYear, startOfYear } from "date-fns";
import WidgetSection from "../components/AnalysisPage/WidgetSection";
import MonthYearPicker from "../components/DateInput/DateSelectionModal/MonthYearPicker";

const searchFunc = (date: number): Promise<ExpenditureWithId[]> => {
  const yearStart = startOfYear(date).getTime();
  const yearEnd = endOfYear(date).getTime();
  return expenditureDatabase.getExpendituresInTimeRange(yearStart, yearEnd);
};

const loadCategoriesFunc = (): Promise<CategoryWithId[]> => {
  return expenditureDatabase.searchCategories("");
};
export default function AnalysisPage() {
  const [viewingDate, setViewingDate] = useState(Date.now());
  const { results: expenditures, loading: loadingExpenditures } = useSearch(
    viewingDate,
    searchFunc,
    (a, b) => {
      const isOneOfDayNull = (!!a && !b) || (!a && !!b);
      if (isOneOfDayNull) return false;
      if (!a && !b) return true;
      return isSameYear(a!, b!);
    }
  );
  const { results: categories, loading: loadingCategories } = useSearch(
    null,
    loadCategoriesFunc
  );
  const loading = loadingCategories || loadingExpenditures;
  return (
    <div className="flex flex-col items-stretch flex-1 gap-2 px-2 overflow-hidden">
      <MonthYearPicker date={viewingDate} onChange={setViewingDate} />
      <WidgetSection
        onMonthChange={setViewingDate}
        month={viewingDate}
        categories={categories}
        expenditures={expenditures}
        loading={loading}
      />
    </div>
  );
}
