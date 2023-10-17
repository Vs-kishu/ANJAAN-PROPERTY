import express from "express";
import { deleteUser, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/updateUser/:id", verifyToken, updateUser);
router.delete("/deleteUser/:id", verifyToken, deleteUser);

export default router;
