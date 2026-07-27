import express from "express";
import { followupChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", followupChat);

export default router;