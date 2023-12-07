import Modal from "../../Modal";

type Props = {
  onClose: () => void;
  opened?: boolean;
  onCreate?: () => void;
};

export default function CreateRegularIncomeModal({
  onClose,
  opened,
  onCreate,
}: Props) {
  if (!opened) return null;
  return (
    <Modal onClose={onClose} title="Create regular income">
      WIP
    </Modal>
  );
}
