import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ExpenditureWithId,
  expenditureDatabase,
} from "../../domain/expenditure";
import useFetch from "../../hooks/useFetch";
import { Updater, createUpdater } from "../../utils/objects";
import RepeatIntervalDisplayInput from "../RegularExpenditurePage/CreateRegularExpenditureModal/RepeatIntervalForm/RepeatIntervalDisplayInput";
import SubPage from "../SubPage";
import ExpenditureDetailForm from "./ExpenditureDetailForm";
import ExpenditureDetailPlaceholder from "./ExpenditureDetailPlaceholder";

const searchFunc = (id: string) => {
  return expenditureDatabase.getExpenditureById(id);
};
type Props = {
  onUpdate: () => void;
};

const EXPENDITURE_HASH_PREFIX = "expenditure-";
const getExpenditureIdFromHash = (hash: string) => {
  const isExpenditureHash = hash.startsWith(EXPENDITURE_HASH_PREFIX);
  if (!isExpenditureHash) return null;
  return hash.replace(EXPENDITURE_HASH_PREFIX, "");
};

export default function ExpenditureDetailPage({ onUpdate }: Props) {
  const expenditureId =
    getExpenditureIdFromHash(useLocation().hash.slice(1)) || "";
  const navigate = useNavigate();
  const { result: expenditure, refetch } = useFetch(expenditureId, searchFunc);
  const updateExpenditure = (
    expenditure: ExpenditureWithId | null | undefined
  ) => {
    if (!expenditure) return;
    const { id, ...data } = expenditure;
    expenditureDatabase
      .updateExpenditure(expenditure.id, data)
      .then(refetch)
      .then(onUpdate)
      .then(() => toast.success("Record updated"))
      .catch(() => toast.error("Failed to update record"));
  };
  const updater = createUpdater(
    expenditure,
    updateExpenditure
  ) as Updater<ExpenditureWithId>;
  const onClose = () => navigate(-1);
  return (
    <SubPage
      className="overflow-y-auto"
      inView={!!expenditureId}
      onClose={onClose}
    >
      {expenditure ? (
        <ExpenditureDetailForm expenditure={expenditure} updater={updater} />
      ) : (
        <ExpenditureDetailPlaceholder />
      )}
      {!!expenditure?.repeat && (
        <RepeatIntervalDisplayInput
          settings={expenditure.repeat}
          onChange={updater("repeat")}
        />
      )}
    </SubPage>
  );
}
