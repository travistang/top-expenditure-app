import classNames from "classnames";

const WEEKDAY_HEADERS = "SMTWTFS".split("");

export default function WeekHeader() {
  return (
    <>
      {WEEKDAY_HEADERS.map((h, i) => (
        <span
          key={`${h}-${i}`}
          className={classNames(
            "aspect-square h-8 flex items-center justify-center rounded-full",
            (i === 0 || i === 6) && "font-bold text-red-500"
          )}
        >
          {h}
        </span>
      ))}
    </>
  );
}
