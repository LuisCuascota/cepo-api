import { Router } from "express";
import { getLoanByAccount, postNewLoan } from "../service/loan.service";
import { methods as loanController } from "../entity/loan.entity";

const router = Router();

router.get("/count/", loanController.getLoanCount);
router.get("/:account", getLoanByAccount);
router.post("/", postNewLoan);

export default router;
