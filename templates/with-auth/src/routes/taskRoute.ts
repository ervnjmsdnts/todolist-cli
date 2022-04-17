import { Router } from "express";
import {
  createTask,
  getAllTask,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = Router();

router.get("/", getAllTask);
router.get("/:id", getTask);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
