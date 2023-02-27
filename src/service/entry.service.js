import { methods as entryEntity } from "../entity/entry.entity";
import moment from "moment";
import config from "../config";
import { EntriesCodeEnum } from "./shared/entriesCode.enum";

export const getEntryOptionListByAccount = async (req, res) => {
  const entries = await entryEntity.getEntryOptionList(req, res);
  const { account } = req.params;
  let feeCapitalMonths = 1;

  if (account !== "0") {
    const feeCapitalDb = await entryEntity.getTotalFeeCapitalByAccount(
      req,
      res
    );
    const feeCapitalCalculated = calculateTotalContribution();

    feeCapitalMonths = calculateFeeCapitalMonths(
      feeCapitalCalculated,
      feeCapitalDb[0].total
    );
  }

  entries.map((option) => (option.value = 0));
  updateFeeCapitalIntoEntries(entries, feeCapitalMonths);

  res.json(entries);
};

const calculateTotalContribution = () => {
  const startDate = moment(config.cepoConfig.startDate);
  //Reducir el month, solo pruebas
  const currentDate = moment().add(1, "M");
  const monthsContribution = currentDate.diff(startDate, "months");

  return (
    config.cepoConfig.startAmount +
    monthsContribution * config.cepoConfig.feeCapital
  );
};

const calculateFeeCapitalMonths = (feeCapitalCalculated, feeCapitalDb) => {
  return Math.round(
    (feeCapitalCalculated - feeCapitalDb) / config.cepoConfig.feeCapital
  );
};

const updateFeeCapitalIntoEntries = (entries, feeCapitalMonths) => {
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
