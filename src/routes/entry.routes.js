import { Router } from "express";
import { methods as entryController } from "../controllers/entry.controller";

const router = Router();

router.get("/option", entryController.getEntryOptionList);
router.get("/count", entryController.getEntryCount);
router.post("/", entryController.postNewEntry);
router.post("/detail", entryController.postNewEntryDetails);

export default router;
