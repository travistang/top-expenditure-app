import { useState } from "react";
import { FaCalendar, FaMoneyBill } from "react-icons/fa";
import Button from "../components/Button";
import ExpenditureDetailPage from "../components/ExpenditureDetailPage";
import RegularExpenditureRecord from "../components/ExpenditureRecord/RegularExpenditureRecord";
import List from "../components/List/list";
import ExpenditureRecordPlaceholder from "../components/Placeholders/ExpenditureRecordPlaceholder";
import { RegularExpenditureWithId } from "../domain/expenditure";
import expenditureSearcher from "../domain/expenditure-search";
import useSearch from "../hooks/useSearch";
import CreateRegularEntryModal from "../components/RegularExpenditurePage/CreateRegularEntryModal";
import Widget from "../components/Widget";

const searchFunc = (includePreviousExpenditures: boolean) => {
  return expenditureSearcher.getRegularExpenditures(
    includePreviousExpenditures
  );
};
export default function RegularExpenditurePage() {
  const [includePreviousExpenditures] = useState(false);
  const [showOptionModal, setShowCreateModal] = useState(false);
  const {
    results: regularExpenditures,
    loading,
    refetch,
  } = useSearch(includePreviousExpenditures, searchFunc);
  const onSelectRegularExpenditure = (exp: RegularExpenditureWithId) => {
    window.location.hash = exp.id;
  };

  return (
    <div className="flex flex-col items-stretch gap-2 flex-1 flex-shrink-0 px-2">
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
      <Widget sensitive icon={FaMoneyBill} title="Regular income">
        WIP
      </Widget>
      <List
        items={regularExpenditures}
        placeholder={<ExpenditureRecordPlaceholder />}
        loading={loading}
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
