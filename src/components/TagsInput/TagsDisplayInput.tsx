import { useEffect, useState } from "react";
import TagsInput from ".";
import DisplayInputBase from "../DisplayInput/DisplayInputBase";
import TagsDisplay from "./TagsDisplay";

type Props = {
  tags: string[];
  onChange: (tags: string[]) => void;
  className?: string;
  label?: string;
};
export default function TagsDisplayInput({
  tags,
  onChange,
  className,
  label,
}: Props) {
  const [tagsPlaceholder, setTagsPlaceholder] = useState<string[]>(tags);

  useEffect(() => {
    setTagsPlaceholder(tags);
  }, [tags]);

  const onCancel = () => {
    setTagsPlaceholder(tags);
  };

  const onCommit = () => {
    onChange(tagsPlaceholder);
  };

  return (
    <DisplayInputBase
      inputComponent={
        <TagsInput
          className="flex-1 col-span-4 justify-end"
          tags={tagsPlaceholder}
          onChange={setTagsPlaceholder}
        />
      }
      onCancel={onCancel}
      onCommit={onCommit}
      label={label}
      className={className}
    >
      <div className="rounded-xl bg-gray-500/50 p-2 flex flex-wrap overflow-y-auto gap-2">
        {!tags.length && (
          <div className="flex-1 h-16 flex items-center justify-center text-sm">
            No tags provided
          </div>
        )}
        {tags.map((tag) => (
          <TagsDisplay key={tag} tag={tag} />
        ))}
      </div>
    </DisplayInputBase>
  );
}
