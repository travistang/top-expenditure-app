import { IconType } from "react-icons/lib";
import { FaCalendarDay, FaCalendarWeek, FaMoon, FaSun } from "react-icons/fa";
import { RepeatInterval } from "../../domain/repeat";

const RegularExpenditureRecordIcon: Record<RepeatInterval, IconType> = {
  [RepeatInterval.Daily]: FaCalendarDay,
  [RepeatInterval.Weekly]: FaCalendarWeek,
  [RepeatInterval.Monthly]: FaMoon,
  [RepeatInterval.Annually]: FaSun,
};

export default RegularExpenditureRecordIcon;
