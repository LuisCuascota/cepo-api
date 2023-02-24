import { Router } from "express";
import { methods as personController } from "../entity/person.entity";

const router = Router();

router.get("/", personController.getPersonList);

export default router;
