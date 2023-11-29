import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SubPage from "../../SubPage";
import {
  RegularExpenditureWithId,
  expenditureDatabase,
} from "../../../domain/expenditure";

export default function RegularExpenditureDetails() {
  const expenditureId = useLocation().hash.slice(1);
  const navigate = useNavigate();
  const [expenditure, setExpenditure] =
    useState<RegularExpenditureWithId | null>(null);

  useEffect(() => {
    if (!expenditureId) {
      setExpenditure(null);
      return;
    }
    Promise.resolve()
      .then(() => setExpenditure(null))
      .then(() => expenditureDatabase.getExpenditureById(expenditureId))
      .then((exp) => {
        if (!exp?.repeat) {
          return navigate(-1);
        }
        setExpenditure(exp as RegularExpenditureWithId);
      })
      .catch(() => navigate(-1));
  }, [navigate, expenditureId]);

  return (
    <SubPage inView={!!expenditureId} onClose={() => navigate(-1)}>
      {expenditure?.name}
    </SubPage>
  );
}
