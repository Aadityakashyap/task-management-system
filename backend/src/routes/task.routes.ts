import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";

const router = Router();

router.use(authenticate);

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
