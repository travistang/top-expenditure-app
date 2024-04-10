import { FaPlus } from "react-icons/fa";
import SimpleInputItem from "./SimpleInputItem";

type Props = {
  onClick: () => void;
};
export default function SimpleAddCategoryButton({ onClick }: Props) {
  return (
    <SimpleInputItem
      onClick={onClick}
      className="h-16 border-dashed border-2 border-gray-800 dark:border-gray-50 px-4"
    >
      <FaPlus />
      New
    </SimpleInputItem>
  );
}
