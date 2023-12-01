import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import CategoryAnalysisSection from "../components/CategoryDetails/CategoryAnalysisSection";
import CategoryExpenditureList from "../components/CategoryDetails/CategoryExpenditureList";
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
  category: string
): Promise<ExpenditureWithId[]> => {
  return expenditureSearcher.searchExpenditures({ category });
};

type Props = {
  onUpdated?: () => void;
};
export default function CategoryDetailPage({ onUpdated }: Props) {
  const selectedId = useLocation().hash.replace(/^#/, "");
  const navigate = useNavigate();
  const [details, setDetails] = useState<CategoryWithId | null>(null);
  const [expenditures, setExpenditures] = useState<ExpenditureWithId[]>([]);
  const [loading, setLoading] = useState(true);

  const refetchCategory = useCallback(() => {
    getCategoryDetails(selectedId).then((details) => {
      setDetails(details ?? null);
    });
  }, [selectedId]);

  const refetchCategoryWithToast = () => {
    Promise.resolve()
      .then(refetchCategory)
      .then(() => toast.success("Data updated"))
      .then(onUpdated);
  };
  useEffect(refetchCategory, [refetchCategory]);
  useEffect(() => {
    if (!details?.id) return;
    Promise.resolve()
      .then(() => setLoading(true))
      .then(() => getExpendituresUnderCategory(details.id))
      .then(setExpenditures)
      .finally(() => setLoading(false));
  }, [details?.id]);

  return (
    <SubPage
      inView={!!selectedId}
      title="Category Details"
      onClose={() => navigate(-1)}
    >
      {!details && <LoadingSpinner className="flex-1 h-full w-full text-3xl" />}
      {details && (
        <CategoryAnalysisSection
          onRefreshCategory={refetchCategoryWithToast}
          category={details}
          expenditures={expenditures}
        />
      )}
      <CategoryExpenditureList expenditures={expenditures} loading={loading} />
    </SubPage>
  );
}
