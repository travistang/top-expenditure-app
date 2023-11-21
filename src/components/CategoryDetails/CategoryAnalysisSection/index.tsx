import classNames from "classnames";
import { useState } from "react";
import * as Fa from "react-icons/fa";
import {
  CategoryWithId,
  ExpenditureWithId,
  expenditureDatabase,
} from "../../../domain/expenditure";
import { average, total } from "../../../domain/expenditure-statistics";
import { formatNumberAsAmount } from "../../../utils/strings";
import IconPicker from "../../IconPicker";
import Widget from "../../Widget";

type Props = {
  expenditures: ExpenditureWithId[];
  className?: string;
  category: CategoryWithId;
  onRefreshCategory: () => void;
};
export default function CategoryAnalysisSection({
  expenditures,
  className,
  category,
  onRefreshCategory,
}: Props) {
  const [iconPickerOpened, setIconPickerOpened] = useState(false);

  const { icon } = category;
  const iconString = icon as keyof typeof Fa;
  const Icon = Fa[iconString] ?? Fa.FaTag;

  const updateIcon = async (icon: string) => {
    expenditureDatabase
      .updateCategory(category.id, { icon })
      .then(onRefreshCategory);
  };

  return (
    <div className={classNames("grid grid-cols-6 gap-2", className)}>
      <IconPicker
        value={iconString ?? "FaTag"}
        onChange={updateIcon}
        opened={iconPickerOpened}
        onClose={() => setIconPickerOpened(false)}
      />
      <Widget
        className="col-span-4 overflow-hidden"
        title="Name"
        icon={Fa.FaTag}
      >
        <span className="overflow-ellipsis line-clamp-2">{category.name}</span>
      </Widget>

      <Widget
        onClick={() => setIconPickerOpened(true)}
        className="relative col-span-2 aspect-square text-4xl"
        title="icon"
      >
        <div className=" flex items-center justify-center">
          {Icon && <Icon />}
        </div>
      </Widget>
      <Widget
        className="col-span-3 text-xl text-right overflow-hidden text-ellipsis"
        title="Total"
        icon={Fa.FaPlus}
      >
        {formatNumberAsAmount(total(expenditures))}
      </Widget>
      <Widget
        className="col-span-3 text-xl text-right overflow-hidden text-ellipsis"
        title="Average"
        icon={Fa.FaDivide}
      >
        {formatNumberAsAmount(average(expenditures))}
      </Widget>
    </div>
  );
}
