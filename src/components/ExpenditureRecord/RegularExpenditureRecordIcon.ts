import { IconType } from "react-icons/lib";
import { RepeatInterval } from "../../domain/regular-expenditure";
import { FaCalendarDay, FaCalendarWeek, FaMoon, FaSun } from "react-icons/fa";

const RegularExpenditureRecordIcon: Record<RepeatInterval, IconType> = {
  [RepeatInterval.Daily]: FaCalendarDay,
  [RepeatInterval.Weekly]: FaCalendarWeek,
  [RepeatInterval.Monthly]: FaMoon,
  [RepeatInterval.Annually]: FaSun,
};

export default RegularExpenditureRecordIcon;
