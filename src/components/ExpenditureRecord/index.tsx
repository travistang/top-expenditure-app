import { useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  ExpenditureWithId,
  expenditureDatabase,
} from "../../domain/expenditure";
import ExpenditureRecordContent from "./ExpenditureRecordContent";
import SwipeableItem, {
  SwipeableItemControlParams,
  SwipeableItemState,
} from "../SwipeableItem";

type Props = {
  expenditure: ExpenditureWithId;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};
export default function ExpenditureRecord({
  expenditure,
  className,
  children,
  onClick,
}: Props) {
  const swipeableRef = useRef<SwipeableItemControlParams>(null!);
  const [deleted, setDeleted] = useState(false);
  const onDelete = () => {
    swipeableRef?.current?.setState(SwipeableItemState.Deleting);
    setTimeout(() => {
      expenditureDatabase
        .deleteExpenditure(expenditure.id)
        .then(() => toast.success("Record deleted", {}))
        .then(() => setDeleted(true))
        .catch(() => {
          toast.error("Failed to delete expenditure");
          swipeableRef?.current?.setState(SwipeableItemState.Idle);
        });
    }, 300);
  };

  if (deleted) return null;
  return (
    <SwipeableItem
      ref={swipeableRef}
      key={expenditure.id}
      className={className}
      menuItems={[
        {
          name: "delete",
          icon: FaTrash,
          color: "red",
          className: "bg-red-500 text-gray-200",
          onClick: onDelete,
        },
      ]}
    >
      <ExpenditureRecordContent onClick={onClick} expenditure={expenditure}>
        {children}
      </ExpenditureRecordContent>
    </SwipeableItem>
  );
}
