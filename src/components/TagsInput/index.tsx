import classNames from "classnames";
import { useState } from "react";
import Button from "../Button";
import { FaTimes } from "react-icons/fa";
import TagsDisplay from "./TagsDisplay";
import InputBase from "../InputBase";

type Props = {
  tags: string[];
  onChange: (tags: string[]) => void;
  className?: string;
  label?: string;
};
export default function TagsInput({ tags, onChange, className, label }: Props) {
  const [sketch, setSketch] = useState("");
  const onAddTag = () => {
    if (!sketch) return;
    onChange([...tags, sketch]);
    setSketch("");
  };
  const onRemoveTag = (tag?: string) => {
    if (!tag) {
      onChange(tags.slice(0, -1));
    } else {
      onChange(tags.filter((t) => t !== tag));
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key.toLowerCase()) {
      case "backspace":
        if (sketch.length === 0) {
          onRemoveTag();
        }
        break;
      case "enter":
        if (sketch.length > 0) {
          onAddTag();
        }
        break;
    }
  };

  return (
    <div
      className={classNames(
        "flex flex-col items-stretch gap-1 overflow-hidden",
        className
      )}
    >
      <InputBase label={label}>
        <input
          onKeyDown={onKeyDown}
          onChange={(e) => setSketch(e.target.value)}
          className="bg-transparent outline-none border-none text-gray-800 w-full"
          value={sketch}
        />
      </InputBase>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <TagsDisplay key={tag} tag={tag} onRemove={() => onRemoveTag(tag)} />
        ))}
      </div>
    </div>
  );
}
