import { getConnection } from "./database/database";

const getLoanByAccount = async (account) => {
  const connection = await getConnection();

  return connection.query(
    "SELECT L.* FROM Loan L WHERE L.account=? AND L.is_end=0",
    account
  );
};

const getLoanDetailByNumber = async (number) => {
  const connection = await getConnection();

  return connection.query(
    "SELECT L.* FROM Loan_detail L WHERE L.loan_number=? ORDER BY L.fee_number;",
    number
  );
};

export const methods = {
  getLoanByAccount,
  getLoanDetailByNumber,
};
