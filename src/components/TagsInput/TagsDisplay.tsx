import { FaTimes } from "react-icons/fa";
import Button from "../Button";

type Props = {
  tag: string;
  onRemove?: () => void;
};
export default function TagsDisplay({ tag, onRemove }: Props) {
  return (
    <div
      key={tag}
      className="flex-shrink-0 rounded-full text-xs flex flex-wrap px-2 py-1 items-center justify-center bg-normal text-normal bg-gray-300 dark:bg-gray-400 text-gray-800 whitespace-nowrap text-ellipsis"
    >
      {tag}
      {onRemove && <Button icon={FaTimes} className="h-4" onClick={onRemove} />}
    </div>
  );
}
