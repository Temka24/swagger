import { Router } from "express";
import { getUsers, addUser, updateUser, deleteUser } from "../controller/user.controller.js";

const router = Router();

router.get("/", getUsers);
router.post("/", addUser);
router.put("/", updateUser);
router.delete("/:id", deleteUser);

export default router;
