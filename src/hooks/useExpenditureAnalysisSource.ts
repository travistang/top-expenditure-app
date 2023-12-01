import { endOfYear, isSameYear, startOfYear } from "date-fns";
import { ExpenditureWithId, expenditureDatabase } from "../domain/expenditure";
import useSearch from "./useSearch";

type Props = {
  date: number;
  withRegularExpenditure: boolean;
};

type SearchFuncProps = {
  date: number;
  withRegularExpenditure?: boolean;
};
const searchFunc = ({
  date,
  withRegularExpenditure,
}: SearchFuncProps): Promise<ExpenditureWithId[]> => {
  const yearStart = startOfYear(date).getTime();
  const yearEnd = endOfYear(date).getTime();
  if (!withRegularExpenditure) {
    return expenditureDatabase.getExpendituresInTimeRange(yearStart, yearEnd);
  }
  return Promise.all([
    expenditureDatabase.getExpendituresInTimeRange(yearStart, yearEnd),
    expenditureDatabase.getRegularExpendituresOccurrenceInTimeRange(
      yearStart,
      yearEnd
    ),
  ]).then(([exps, regExps]) => {
    return [...exps, ...regExps];
  });
};

export default function useExpenditureAnalysisSource({
  date,
  withRegularExpenditure,
}: Props) {
  return useSearch(
    { date, withRegularExpenditure },
    searchFunc,
    (propA, propB) => {
      if ((!!propA && !propB) || (!propA && !!propB)) return false;
      if (!propA && !propB) return true;
      const { withRegularExpenditure: withA, date: a } = propA!;
      const { withRegularExpenditure: withB, date: b } = propB!;
      return withA === withB && isSameYear(a, b);
    }
  );
}
