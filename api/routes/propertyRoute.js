import express from "express";
import {
  createPoperty,
  fetchAllProp,
} from "../controllers/propertyController.js";

const router = express.Router();

router.post("/addProp", createPoperty);
router.get("/allProp", fetchAllProp);

export default router;
