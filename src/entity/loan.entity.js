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

const getLoanCount = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT count(e.number)+1 as count FROM Loan e;"
    );

    res.json(result[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const saveLoanHeader = async (header) => {
  const connection = await getConnection();

  await connection.query("INSERT INTO Loan SET ?", header);
};

const saveLoanDetail = async (detail) => {
  const connection = await getConnection();

  detail.map(async (loanDetail) => {
    await connection.query("INSERT INTO Loan_detail SET ?", loanDetail);
  });
};

export const methods = {
  getLoanByAccount,
  getLoanCount,
  getLoanDetailByNumber,
  getLoanDetailCountPaid,
  saveLoanDetail,
  saveLoanHeader,
  updateLoanDetail,
  updateLoanFinalization,
};
