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

const updateLoanDetail = async (loanDetail) => {
  const connection = await getConnection();

  loanDetail.map(async (detail) => {
    await connection.query(
      "UPDATE Loan_detail D SET D.balance_after_pay = ?, D.is_paid = 1, D.entry_number = ? WHERE D.id = ?",
      [detail.balance, detail.entry, detail.id]
    );
  });
};

const updateLoanFinalization = async (number) => {
  const connection = await getConnection();

  return connection.query(
    "UPDATE Loan L SET L.is_end = 1 WHERE L.number = ?",
    number
  );
};

const getLoanDetailCountPaid = async (number) => {
  const connection = await getConnection();

  return connection.query(
    "SELECT count(L.loan_number) AS count FROM Loan_detail L WHERE L.loan_number=? AND L.is_paid=1;",
    number
  );
};

export const methods = {
  getLoanByAccount,
  getLoanDetailByNumber,
  getLoanDetailCountPaid,
  updateLoanDetail,
  updateLoanFinalization,
};
