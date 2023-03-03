import { config } from "dotenv";

config();

export default {
  cepoConfig: {
    feeCapital: 20,
    feePenalty: 1,
    loanPenaltyPercentage: 0.1,
    startAmount: 100,
    startDate: "2022-07-02",
    strategicFund: 1,
  },
  database: {
    host: "localhost",
    name: "cepo_de_oro",
    password: "",
    user: "root",
  },
};
