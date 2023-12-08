import { useNavigate } from "react-router-dom";
import { ExpenditureWithId } from "../../../domain/expenditure";
import { Routes } from "../../../routes";
import ExpenditureRecord from "../../Record";
import List from "../../List/list";

type Props = {
  expenditures: ExpenditureWithId[];
  loading?: boolean;
};
export default function CategoryExpenditureList({
  loading,
  expenditures,
}: Props) {
  const navigate = useNavigate();
  const goToExpenditureDetails = (id: string) =>
    navigate(`${Routes.ExpenditureList}#${id}`);
  return (
    <div className="flex-1 overflow-y-auto">
      <List
        title="Expenditures under category"
        noResultMessage="No expenditures under this category"
        className="mt-4"
        loading={loading}
        items={expenditures}
      >
        {(expenditure) => (
          <ExpenditureRecord
            onClick={() => goToExpenditureDetails(expenditure.id)}
            key={expenditure.id}
            expenditure={expenditure}
          />
        )}
      </List>
    </div>
  );
}
