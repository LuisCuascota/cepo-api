import { Router } from "express";
import { methods as entryController } from "../entity/entry.entity";

const router = Router();

router.get("/option", entryController.getEntryOptionList);
router.get("/count", entryController.getEntryCount);
router.post("/", entryController.postNewEntry);
router.post("/detail", entryController.postNewEntryDetails);

export default router;
