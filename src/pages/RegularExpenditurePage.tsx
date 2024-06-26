import { useState } from "react";
import { FaCalendar, FaMoneyBill } from "react-icons/fa";
import Button from "../components/Button";
import ExpenditureDetailPage from "../components/ExpenditureDetailPage";
import List from "../components/List/list";
import ExpenditureRecordPlaceholder from "../components/Placeholders/ExpenditureRecordPlaceholder";
import RegularExpenditureRecord from "../components/Record/RegularExpenditureRecord";
import RegularIncomeRecord from "../components/Record/RegularIncomeRecord";
import CreateRegularEntryModal from "../components/RegularExpenditurePage/CreateRegularEntryModal";
import RegularExpenditureSummary from "../components/RegularExpenditurePage/RegularExpenditureSummary";
import RegularIncomeDetailPage from "../components/RegularExpenditurePage/RegularIncomeDetailPage";
import Widget from "../components/Widget";
import {
  RegularExpenditureWithId,
  expenditureDatabase,
} from "../domain/expenditure";
import expenditureSearcher from "../domain/expenditure-search";
import { IncomeWithId } from "../domain/income";
import useSearch from "../hooks/useSearch";

const searchFunc = (includePreviousExpenditures: boolean) => {
  return expenditureSearcher.getRegularExpenditures(
    includePreviousExpenditures
  );
};
const regularIncomeFetchFunc = () =>
  expenditureDatabase.getAllIncomes() as Promise<IncomeWithId[]>;

export default function RegularExpenditurePage() {
  const [includePreviousExpenditures] = useState(false);
  const [showOptionModal, setShowCreateModal] = useState(false);
  const {
    results: regularExpenditures,
    loading: loadingRegularExpenditures,
    refetch: refetchExpenditure,
  } = useSearch(includePreviousExpenditures, searchFunc);
  const {
    results: regularIncomes,
    loading: loadingIncomes,
    refetch: refetchIncome,
  } = useSearch(undefined, regularIncomeFetchFunc);

  const refetch = () => {
    refetchExpenditure();
    refetchIncome();
  };

  const onSelectRegularIncome = (income: IncomeWithId) => {
    window.location.hash = `income-${income.id}`;
  };
  const onSelectRegularExpenditure = (exp: RegularExpenditureWithId) => {
    window.location.hash = `expenditure-${exp.id}`;
  };

  return (
    <div className="flex flex-col items-stretch gap-2 flex-1 flex-shrink-0 px-2 max-h-screen overflow-y-hidden">
      <RegularIncomeDetailPage onUpdate={refetch} />
      <ExpenditureDetailPage onUpdate={refetch} />
      <div className="flex items-center py-1 justify-end px-2 gap-2">
        <Button
          color="green"
          icon={FaCalendar}
          text="Create regular..."
          onClick={() => setShowCreateModal(true)}
        />
      </div>
      <CreateRegularEntryModal
        opened={showOptionModal}
        refetch={refetch}
        onClose={() => setShowCreateModal(false)}
      />
      <RegularExpenditureSummary
        className="flex-shrink-0"
        incomes={regularIncomes}
        expenditures={regularExpenditures}
      />
      {regularIncomes.length > 0 && (
        <Widget
          sensitive
          icon={FaMoneyBill}
          className="flex-shrink-0"
          title="Regular income"
        >
          <List
            numPlaceholder={1}
            items={regularIncomes}
            placeholder={<ExpenditureRecordPlaceholder />}
            loading={loadingIncomes}
            noResultMessage=""
          >
            {(item) => (
              <RegularIncomeRecord
                income={item}
                onClick={() => onSelectRegularIncome(item)}
                key={item.id}
                className="hover:bg-gray-500 rounded-xl"
              />
            )}
          </List>
        </Widget>
      )}
      <List
        items={regularExpenditures}
        placeholder={<ExpenditureRecordPlaceholder />}
        loading={loadingRegularExpenditures}
        noResultMessage="No regular expenditures configured"
      >
        {(item) => (
          <RegularExpenditureRecord
            onClick={() => onSelectRegularExpenditure(item)}
            key={item.id}
            expenditure={item}
          />
        )}
      </List>
    </div>
  );
}
