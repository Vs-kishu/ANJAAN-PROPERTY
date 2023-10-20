import express from "express";
import {
  createPoperty,
  deleteProperty,
  editProperty,
  fetchAllProp,
  fetchProp,
  fetchUserProp,
} from "../controllers/propertyController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router
  .post("/addProp", createPoperty)
  .get("/allProp", fetchAllProp)
  .get("/userProperties/:id", verifyToken, fetchUserProp)
  .delete("/delProp/:id", verifyToken, deleteProperty)
  .get("/getProp/:id", fetchProp)
  .post("/editProp/:id", verifyToken, editProperty);

export default router;
