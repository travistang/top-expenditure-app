import { useState } from "react";
import * as Fa from "react-icons/fa";
import useSearch from "../../hooks/useSearch";
import { containsSubstring } from "../../utils/strings";
import Button from "../Button";
import List from "../List/list";
import Modal from "../Modal";
import SquarePlaceholder from "../Placeholders/SquarePlaceholder";
import TextInput from "../TextInput";

const searchForIcons = async (searchString: string) =>
  Object.keys(Fa)
    .filter((key) => containsSubstring(key, searchString))
    .map((key) => key as IconType);

type IconType = keyof typeof Fa;
type Props = {
  value: IconType;
  onChange: (value: IconType) => void;
  opened?: boolean;
  onClose: () => void;
};
export default function IconPicker({
  value,
  onChange,
  onClose,
  opened,
}: Props) {
  const [searchString, setSearchString] = useState(value as string);
  const { results, loading } = useSearch(searchString, searchForIcons);
  if (!opened) return null;
  const onSelectIconWithClose = (icon: IconType) => {
    onChange(icon);
    onClose();
  };
  return (
    <Modal onClose={onClose} title="Select icon">
      <TextInput
        icon={Fa.FaSearch}
        value={searchString}
        onChange={setSearchString}
        placeholder="Search for an icon..."
      />
      <List
        className="mt-2 gap-2 overflow-y-auto max-h-36 justify-items-center items-center"
        placeholder={<SquarePlaceholder className="h-8" />}
        numPlaceholder={5}
        loading={loading}
        items={results}
        itemsPerLine={3}
      >
        {(icon) => (
          <Button
            icon={Fa[icon]}
            className="text-xl aspect-square h-8"
            color="transparent"
            onClick={() => onSelectIconWithClose(icon)}
          />
        )}
      </List>
    </Modal>
  );
}
