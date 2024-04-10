import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { expenditureDatabase } from "../../../domain/expenditure";
import Button from "../../Button";
import Modal from "../../Modal";
import TextInput from "../../TextInput";

type Props = {
  opened?: boolean;
  onClose: (created?: boolean) => void;
};

export default function CreateCategoryModal({ opened, onClose }: Props) {
  const [value, setValue] = useState("");

  const onCreateCategory = () => {
    if (!value) {
      toast.error("Please fill in the category name!");
      return;
    }
    return expenditureDatabase
      .createCategory(value)
      .then((id) => {
        if (!id) throw new Error("Cannot create category");
        toast.success("Category created");
        setValue("");
        onClose(true);
      })
      .catch((e) => {
        toast.error(e);
      });
  };
  if (!opened) return null;
  return (
    <Modal title="Create category" onClose={onClose} className="pb-12">
      <div className="pb-4 h-12 flex flex-col items-stretch gap-2">
        <TextInput
          value={value}
          className="w-full bg-transparent"
          onChange={setValue}
          placeholder="Name of the category"
        />
        <div className="flex items-center justify-end py-2">
          <Button
            onClick={onCreateCategory}
            disabled={!value}
            text="Create"
            className="flex-shrink-0 bg-green-500"
            icon={FaPlus}
          />
        </div>
      </div>
    </Modal>
  );
}
