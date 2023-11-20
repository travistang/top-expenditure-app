import { useState } from "react";
import {
  CategoryWithId,
  ExpenditureWithId,
  expenditureDatabase,
} from "../domain/expenditure";
import useSearch from "../hooks/useSearch";
import { endOfMonth, startOfMonth } from "date-fns";
import WidgetSection from "../components/AnalysisPage/WidgetSection";
import MonthYearPicker from "../components/DateInput/DateSelectionModal/MonthYearPicker";

const searchFunc = (date: number): Promise<ExpenditureWithId[]> => {
  const monthStart = startOfMonth(date).getTime();
  const monthEnd = endOfMonth(date).getTime();
  return expenditureDatabase.getExpendituresInTimeRange(monthStart, monthEnd);
};

const loadCategoriesFunc = (): Promise<CategoryWithId[]> => {
  return expenditureDatabase.searchCategories("");
};
export default function AnalysisPage() {
  const [viewingDate, setViewingDate] = useState(Date.now());
  const { results: expenditures, loading: loadingExpenditures } = useSearch(
    viewingDate,
    searchFunc
  );
  const { results: categories, loading: loadingCategories } = useSearch(
    null,
    loadCategoriesFunc
  );
  const loading = loadingCategories || loadingExpenditures;

  return (
    <div className="flex flex-col items-stretch flex-1 gap-2 px-2 overflow-hidden">
      <MonthYearPicker
        onSelectModeChange={console.log}
        date={viewingDate}
        onChange={setViewingDate}
      />
      <WidgetSection
        categories={categories}
        expenditures={expenditures}
        loading={loading}
      />
    </div>
  );
}
