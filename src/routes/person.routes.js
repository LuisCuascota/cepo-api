import { Router } from "express";
import { methods as personController } from "../controllers/person.controller";

const router = Router();

router.get("/", personController.getPersonList);

export default router;
