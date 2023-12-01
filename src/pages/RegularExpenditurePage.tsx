import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import classNames from "classnames";
import expenditureSearcher from "../domain/expenditure-search";
import useSearch from "../hooks/useSearch";
import List from "../components/List/list";
import ExpenditureRecordPlaceholder from "../components/Placeholders/ExpenditureRecordPlaceholder";
import Button from "../components/Button";
import CreateRegularExpenditureModal from "../components/RegularExpenditurePage/CreateRegularExpenditureModal";
import RegularExpenditureRecord from "../components/ExpenditureRecord/RegularExpenditureRecord";
import { RegularExpenditureWithId } from "../domain/expenditure";
import RegularExpenditureDetails from "../components/RegularExpenditurePage/RegularExpenditureDetails";
import ExpenditureDetailPage from "../components/ExpenditureDetailPage";

const searchFunc = (includePreviousExpenditures: boolean) => {
  return expenditureSearcher.getRegularExpenditures(
    includePreviousExpenditures
  );
};
export default function RegularExpenditurePage() {
  const [includePreviousExpenditures] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const {
    results: regularExpenditures,
    loading,
    refetch,
  } = useSearch(includePreviousExpenditures, searchFunc);
  const onSelectRegularExpenditure = (exp: RegularExpenditureWithId) => {
    window.location.hash = exp.id;
  };

  return (
    <div className="flex flex-col items-stretch gap-2 flex-1 flex-shrink-0">
      <ExpenditureDetailPage onUpdate={refetch} />
      <div className="flex items-center py-1 justify-end px-2">
        <Button
          color="green"
          icon={FaPlus}
          text="Create regular expenditure"
          onClick={() => setShowCreateModal(true)}
          className={classNames("px-2", loading && "hidden")}
        />
      </div>
      <CreateRegularExpenditureModal
        opened={showCreateModal}
        onCreate={refetch}
        onClose={() => setShowCreateModal(false)}
      />
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
