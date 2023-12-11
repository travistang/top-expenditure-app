import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { expenditureDatabase } from "../../../domain/expenditure";
import { IncomeWithId } from "../../../domain/income";
import useFetch from "../../../hooks/useFetch";
import { createUpdater } from "../../../utils/objects";
import ExpenditureDetailPlaceholder from "../../ExpenditureDetailPage/ExpenditureDetailPlaceholder";
import SubPage from "../../SubPage";
import RegularIncomeForm from "./RegularIncomeForm";

const INCOME_HASH_PREFIX = "income-";
const getIncomeIdFromHash = (hash: string) => {
  const isExpenditureHash = hash.startsWith(INCOME_HASH_PREFIX);
  if (!isExpenditureHash) return null;
  return hash.replace(INCOME_HASH_PREFIX, "");
};
const searchFunc = (id: string | null): Promise<IncomeWithId | undefined> => {
  return Promise.resolve().then(() => {
    if (!id) return undefined;
    return expenditureDatabase.getIncomeById(id);
  });
};

type Props = {
  onUpdate?: () => void;
};
export default function RegularIncomeDetailPage({ onUpdate }: Props) {
  const regularIncomeId = getIncomeIdFromHash(useLocation().hash.slice(1));
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { result: income, refetch } = useFetch(regularIncomeId, searchFunc);
  const updateIncome = (expenditure: IncomeWithId | null | undefined) => {
    if (!expenditure) return;
    const { id, ...data } = expenditure;
    expenditureDatabase
      .updateIncome(expenditure.id, data)
      .then(refetch)
      .then(onUpdate)
      .then(() => toast.success("Record updated"))
      .catch(() => toast.error("Failed to update record"));
  };
  const updater = createUpdater(income, updateIncome);
  return (
    <SubPage onClose={goBack} inView={!!regularIncomeId}>
      {income ? (
        <RegularIncomeForm income={income} updater={updater} />
      ) : (
        <ExpenditureDetailPlaceholder />
      )}
    </SubPage>
  );
}
