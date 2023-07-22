import { Router } from "express";
import { methods as entryController } from "../entity/entry.entity";
import {
  getEntryDetailByNumber,
  getEntryList,
  getEntryOptionListByAccount,
  saveNewEntry,
} from "../service/entry.service";

const router = Router();

router.get("/option", entryController.getEntryOptionList);
router.get("/option/:account", getEntryOptionListByAccount);
router.get("/count", entryController.getEntryCount);
router.post("/", saveNewEntry);
router.get("/", getEntryList);
router.get("/detail/:number", getEntryDetailByNumber);

export default router;
