import classNames from "classnames";
import { useCallback, useState } from "react";
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
import ColorPicker from "../../ColorPicker";

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

  const update = useCallback(
    async (data: Partial<CategoryWithId>) => {
      expenditureDatabase
        .updateCategory(category.id, data)
        .then(onRefreshCategory);
    },
    [category, onRefreshCategory]
  );

  return (
    <div className={classNames("grid grid-cols-6 gap-2", className)}>
      <IconPicker
        value={iconString ?? "FaTag"}
        onChange={(icon) => update({ icon })}
        opened={iconPickerOpened}
        onClose={() => setIconPickerOpened(false)}
      />
      <Widget
        className="col-span-2 overflow-hidden"
        title="Name"
        icon={Fa.FaTag}
      >
        <span className="overflow-ellipsis line-clamp-2">{category.name}</span>
      </Widget>

      <Widget
        onClick={() => setIconPickerOpened(true)}
        className="relative col-span-2 text-4xl"
        title="icon"
      >
        <div className="flex items-center justify-center">
          {Icon && <Icon />}
        </div>
      </Widget>
      <Widget className="col-span-2" title="color">
        <div className="flex items-center justify-center">
          <ColorPicker
            className="h-8"
            color={category.color}
            onChange={(color) => update({ color })}
          />
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
