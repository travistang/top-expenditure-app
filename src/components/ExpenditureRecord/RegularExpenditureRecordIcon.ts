import { IconType } from "react-icons/lib";
import { RegularExpenditureInterval } from "../../domain/regular-expenditure";
import { FaCalendarDay, FaCalendarWeek, FaMoon, FaSun } from "react-icons/fa";

const RegularExpenditureRecordIcon: Record<
  RegularExpenditureInterval,
  IconType
> = {
  [RegularExpenditureInterval.Daily]: FaCalendarDay,
  [RegularExpenditureInterval.Weekly]: FaCalendarWeek,
  [RegularExpenditureInterval.Monthly]: FaMoon,
  [RegularExpenditureInterval.Yearly]: FaSun,
};

export default RegularExpenditureRecordIcon;
