import { Repeatable } from "./repeat";

export type Income = Repeatable & {
  name: string;
};
export type IncomeWithId = Income & {
  id: string;
};
