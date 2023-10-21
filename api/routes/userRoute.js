import express from "express";
import {
  deleteUser,
  fetchUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router
  .post("/updateUser/:id", verifyToken, updateUser)
  .delete("/deleteUser/:id", verifyToken, deleteUser)
  .get("/:id", verifyToken, fetchUser);

export default router;
