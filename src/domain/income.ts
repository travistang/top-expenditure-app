import { Repeat } from "./repeat";

export type Income = {
  name: string;
  amount: number;
  repeat?: Repeat;
};
export type IncomeWithId = Income & {
  id: string;
};

export type RegularIncome = Income & { repeat: Repeat };
export type RegularIncomeWithId = RegularIncome & { id: string };
