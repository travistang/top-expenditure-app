import { endOfMonth, startOfMonth } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import CategoryAnalysisSection from "../components/CategoryDetails/CategoryAnalysisSection";
import CategoryBudgetSection from "../components/CategoryDetails/CategoryBudgetSection";
import CategoryExpenditureList from "../components/CategoryDetails/CategoryExpenditureList";
import MonthYearPicker from "../components/DateInput/DateSelectionModal/MonthYearPicker";
import LoadingSpinner from "../components/LoadingSpinner";
import SubPage from "../components/SubPage";
import {
  CategoryWithId,
  ExpenditureWithId,
  expenditureDatabase,
} from "../domain/expenditure";
import expenditureSearcher from "../domain/expenditure-search";

const getCategoryDetails = (id: string) => {
  return expenditureDatabase.getCategoryById(id);
};

const getExpendituresUnderCategory = (
  category: string,
  date: number
): Promise<ExpenditureWithId[]> => {
  const from = startOfMonth(date).getTime();
  const to = endOfMonth(date).getTime();

  return expenditureSearcher.searchExpenditures({
    category,
    fromDate: from,
    toDate: to,
  });
};

type Props = {
  onUpdated?: () => void;
};
export default function CategoryDetailPage({ onUpdated }: Props) {
  const selectedId = useLocation().hash.replace(/^#/, "");
  const navigate = useNavigate();
  const [viewingDate, setViewingDate] = useState(Date.now());
  const [category, setCategory] = useState<CategoryWithId | null>(null);
  const [expenditures, setExpenditures] = useState<ExpenditureWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const refetchCategory = useCallback(() => {
    getCategoryDetails(selectedId).then((category) => {
      setCategory(category ?? null);
    });
  }, [selectedId]);

  const onUpdatedWithRefetch = () => {
    onUpdated?.();
    refetchCategory();
  };

  const refetchCategoryWithToast = () => {
    Promise.resolve()
      .then(refetchCategory)
      .then(() => toast.success("Data updated"))
      .then(onUpdatedWithRefetch);
  };
  useEffect(refetchCategory, [refetchCategory]);
  useEffect(() => {
    if (!category?.id) return;
    Promise.resolve()
      .then(() => setLoading(true))
      .then(() => getExpendituresUnderCategory(category.id, viewingDate))
      .then(setExpenditures)
      .finally(() => setLoading(false));
  }, [category?.id, viewingDate]);

  return (
    <SubPage
      inView={!!selectedId}
      title="Category Details"
      onClose={() => navigate(-1)}
    >
      {!category && (
        <LoadingSpinner className="flex-1 h-full w-full text-3xl" />
      )}
      {category && (
        <CategoryAnalysisSection
          onRefreshCategory={refetchCategoryWithToast}
          category={category}
          expenditures={expenditures}
        />
      )}
      <MonthYearPicker date={viewingDate} onChange={setViewingDate} />
      {category && (
        <CategoryBudgetSection
          expenditures={expenditures}
          onUpdate={onUpdatedWithRefetch}
          category={category}
        />
      )}
      <CategoryExpenditureList expenditures={expenditures} loading={loading} />
    </SubPage>
  );
}
