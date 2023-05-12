import { methods as loanEntity } from "../entity/loan.entity";

export const getLoanByAccount = async (req, res) => {
  const { account } = req.params;
  const loanDb = await loanEntity.getLoanByAccount(account);

  if (loanDb.length !== 0) {
    const loanDetailDb = await loanEntity.getLoanDetailByNumber(
      loanDb[0].number
    );

    res.json({
      detail: loanDetailDb,
      loan: loanDb[0],
    });

    return;
  }

  res.json({});
};

export const postNewLoan = async (req, res) => {
  try {
    await loanEntity.saveLoanHeader(req.body.loan);
    await loanEntity.saveLoanDetail(req.body.detail);

    res.json({ message: "OK" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
