import { startOfDay } from "date-fns";
import { useMemo } from "react";
import { ExpenditureWithId } from "../../../domain/expenditure";
import Calendar, { CalendarHighlights } from "../../Calendar";
import ExpenditureRecord from "../../ExpenditureRecord";
import List from "../../List/list";

const computeHighlightedDates = (
  expenditures: ExpenditureWithId[]
): CalendarHighlights[] => {
  const datesToHighlight = expenditures.reduce<number[]>((dates, exp) => {
    const expDate = startOfDay(exp.date).getTime();
    if (dates.includes(expDate)) return dates;
    return [...dates, expDate];
  }, []);

  return datesToHighlight.map((date) => ({ date, color: "indigo" }));
};

type Props = {
  expenditures: ExpenditureWithId[];
  loading?: boolean;
};
export default function CategoryExpenditureList({
  loading,
  expenditures,
}: Props) {
  const calendarHighlights = useMemo(
    () => computeHighlightedDates(expenditures),
    [expenditures]
  );

  return (
    <>
      {expenditures.length > 0 && (
        <Calendar
          displayingDate={Date.now()}
          highlights={calendarHighlights}
          className="bg-gray-500/20 rounded-xl"
        />
      )}
      <List
        title="Expenditures under category"
        noResultMessage="No expenditures under this category"
        className="mt-4"
        loading={loading}
        items={expenditures}
      >
        {(expenditure) => (
          <ExpenditureRecord key={expenditure.id} expenditure={expenditure} />
        )}
      </List>
    </>
  );
}
