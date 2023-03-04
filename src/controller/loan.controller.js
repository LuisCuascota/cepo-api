import { Router } from "express";
import { getLoanByAccount } from "../service/loan.service";

const router = Router();

router.get("/:account", getLoanByAccount);

export default router;
