import { useState } from "react";
import { CategoryWithId, expenditureDatabase } from "../domain/expenditure";
import useSearch from "../hooks/useSearch";
import WidgetSection from "../components/AnalysisPage/WidgetSection";
import MonthYearPicker from "../components/DateInput/DateSelectionModal/MonthYearPicker";
import useExpenditureAnalysisSource from "../hooks/useExpenditureAnalysisSource";
import CheckboxInput from "../components/CheckboxInput";

const loadCategoriesFunc = (): Promise<CategoryWithId[]> => {
  return expenditureDatabase.searchCategories("");
};
export default function AnalysisPage() {
  const [viewingDate, setViewingDate] = useState(Date.now());
  const [includeRegularExpenditure, setIncludeRegularExpenditure] =
    useState(false);
  const { results: expenditures, loading: loadingExpenditures } =
    useExpenditureAnalysisSource({
      date: viewingDate,
      withRegularExpenditure: includeRegularExpenditure,
    });
  const { results: categories, loading: loadingCategories } = useSearch(
    null,
    loadCategoriesFunc
  );
  const loading = loadingCategories || loadingExpenditures;
  return (
    <div className="flex flex-col items-stretch flex-1 gap-2 px-2 overflow-hidden">
      <div className="grid grid-cols-2 gap-2">
        <MonthYearPicker
          className="flex-1"
          date={viewingDate}
          onChange={setViewingDate}
        />
        <CheckboxInput
          text="With regular expenditure"
          className="flex-1 flex-row-reverse"
          checked={includeRegularExpenditure}
          onToggle={() =>
            setIncludeRegularExpenditure(!includeRegularExpenditure)
          }
        />
      </div>
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
