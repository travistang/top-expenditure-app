import { useState } from "react";
import { FaFire, FaMoneyBill } from "react-icons/fa";
import Button from "../../Button";
import Modal from "../../Modal";
import CreateRegularExpenditureModal from "../CreateRegularExpenditureModal";
import CreateRegularIncomeModal from "../CreateRegularIncomeModal";

enum ModalType {
  IncomeModal,
  ExpenditureModal,
  None,
}
type Props = {
  opened?: boolean;
  onClose: () => void;
  refetch?: () => void;
};
export default function CreateRegularEntryModal({
  opened,
  refetch,
  onClose,
}: Props) {
  const [modalType, setModalType] = useState(ModalType.None);
  if (!opened) return null;
  return (
    <Modal title="Create regular..." onClose={onClose}>
      <CreateRegularIncomeModal
        onCreate={refetch}
        onClose={() => setModalType(ModalType.None)}
        opened={modalType === ModalType.IncomeModal}
      />
      <CreateRegularExpenditureModal
        onCreate={refetch}
        onClose={() => setModalType(ModalType.None)}
        opened={modalType === ModalType.ExpenditureModal}
      />
      <div className="grid grid-cols-2 gap-2">
        <Button
          squared
          onClick={() => setModalType(ModalType.IncomeModal)}
          className="flex-col gap-2 h-24"
          color="green"
          icon={FaMoneyBill}
          text="Income"
        />
        <Button
          squared
          onClick={() => setModalType(ModalType.ExpenditureModal)}
          className="flex-col gap-2 h-24"
          color="red"
          icon={FaFire}
          text="Expenditure"
        />
      </div>
    </Modal>
  );
}
