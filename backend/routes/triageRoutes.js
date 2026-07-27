import express from "express";
import { triage } from "../controllers/triageController.js";

const router = express.Router();

router.post("/", triage);

export default router;