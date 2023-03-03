import { Router } from "express";
import { methods as entryController } from "../entity/entry.entity";
import { getEntryOptionListByAccount } from "../service/entry.service";

const router = Router();

router.get("/option", entryController.getEntryOptionList);
router.get("/option/:account", getEntryOptionListByAccount);
router.get("/count", entryController.getEntryCount);
router.post("/", entryController.postNewEntry);

export default router;
