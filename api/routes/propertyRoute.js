import express from "express";
import { createPoperty } from "../controllers/propertyController.js";

const router = express.Router();

router.post("/addProp", createPoperty);

export default router;
