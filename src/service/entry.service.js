import { methods as entryEntity } from "../entity/entry.entity";
import { methods as loanEntity } from "../entity/loan.entity";
import moment from "moment";
import config from "../config";
import { EntriesCodeEnum } from "./shared/entriesCode.enum";

export const getEntryOptionListByAccount = async (req, res) => {
  const entries = await entryEntity.getEntryOptionList();
  const { account } = req.params;

  entries.map((option) => (option.value = 0));

  await updateFeeCapitalIntoEntries(entries, account);
  await updateFeeLoanIntoEntries(entries, account);
  res.json(entries);
};

const calculateTotalContribution = () => {
  const startDate = moment(config.cepoConfig.startDate);
  //TODO: Reducir el month, solo pruebas
  const currentDate = moment(); //.add(1, "M");
  const monthsContribution = currentDate.diff(startDate, "months");

  return (
    config.cepoConfig.startAmount +
    monthsContribution * config.cepoConfig.feeCapital
  );
};

const updateFeeLoanIntoEntries = async (entries, account) => {
  if (account !== "0") {
    const loanDb = await loanEntity.getLoanByAccount(account);

    if (loanDb.length !== 0) {
      const loanDetailDb = await loanEntity.getLoanDetailByNumber(
        loanDb[0].number
      );
      //TODO: Reducir el month, solo pruebas
      const currentDate = moment(); //.add(1, "M");
      const currentMonth = currentDate.month();
      const currentYear = currentDate.year();
      let loanFee = 0;
      let loanInterest = 0;
      let loanFeePenalty = 0;

      loanDetailDb.map((detail) => {
        const detailDate = moment(detail.payment_date);
        const detailMonth = detailDate.month();
        const detailYear = detailDate.year();

        if (
          currentYear >= detailYear &&
          currentMonth >= detailMonth &&
          !detail.is_paid
        ) {
          loanFee += detail.fee_value;
          loanInterest += detail.interest;
          if (currentMonth > detailMonth)
            loanFeePenalty +=
              detail.fee_value * config.cepoConfig.loanPenaltyPercentage;
        }
      });

      addFeeLoanValues(entries, loanFee, loanInterest, loanFeePenalty);
    }
  }
};

const calculateFeeCapitalMonths = (feeCapitalCalculated, feeCapitalDb) => {
  return Math.round(
    (feeCapitalCalculated - feeCapitalDb) / config.cepoConfig.feeCapital
  );
};

const updateFeeCapitalIntoEntries = async (entries, account) => {
  let feeCapitalMonths = 1;

  if (account !== "0") {
    const feeCapitalDb = await entryEntity.getTotalFeeCapitalByAccount(account);
    const feeCapitalCalculated = calculateTotalContribution();

    feeCapitalMonths = calculateFeeCapitalMonths(
      feeCapitalCalculated,
      feeCapitalDb[0].total
    );
  }

  addFeeCapitalValues(entries, feeCapitalMonths);
};

const addFeeCapitalValues = (entries, feeCapitalMonths) => {
  entries.map((option) => {
    switch (option.id) {
      case EntriesCodeEnum.FeeCapital:
        option.value = feeCapitalMonths * config.cepoConfig.feeCapital;
        break;
      case EntriesCodeEnum.StrategicFund:
        option.value = feeCapitalMonths * config.cepoConfig.strategicFund;
        break;
      case EntriesCodeEnum.FeePenalty:
        option.value =
          feeCapitalMonths === 0
            ? 0
            : (feeCapitalMonths - 1) * config.cepoConfig.feePenalty;
        break;
    }
  });
};

const addFeeLoanValues = (entries, loanFee, loanInterest, loanFeePenalty) => {
  entries.map((option) => {
    switch (option.id) {
      case EntriesCodeEnum.LoanFee:
        option.value = loanFee;
        break;
      case EntriesCodeEnum.LoanInterest:
        option.value = loanInterest;
        break;
      case EntriesCodeEnum.LoanFeePenalty:
        option.value = loanFeePenalty;
        break;
    }
  });
};
