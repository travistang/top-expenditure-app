import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ExpenditureWithId,
  expenditureDatabase,
} from "../../domain/expenditure";
import useFetch from "../../hooks/useFetch";
import SubPage from "../SubPage";
import { Updater, createUpdater } from "../../utils/objects";
import ExpenditureDetailForm from "./ExpenditureDetailForm";
import ExpenditureDetailPlaceholder from "./ExpenditureDetailPlaceholder";
import RepeatIntervalDisplayInput from "../RegularExpenditurePage/CreateRegularExpenditureModal/RepeatIntervalForm/RepeatIntervalDisplayInput";

const searchFunc = (id: string) => {
  return expenditureDatabase.getExpenditureById(id);
};
type Props = {
  onUpdate: () => void;
};
export default function ExpenditureDetailPage({ onUpdate }: Props) {
  const expenditureId = useLocation().hash.slice(1);
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
