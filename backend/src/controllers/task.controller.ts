import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { taskService } from "../services/task.service";
import {
  createTaskSchema,
  taskQuerySchema,
  updateTaskSchema,
} from "../validators/task.validator";

export const getTasks = async (req: AuthRequest, res: Response) => {
  const parsed = taskQuerySchema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ error: "Invalid query" });

  const result = await taskService.getPaginated(req.userId!, parsed.data);

  return res.status(200).json(result);
};

export const createTask = async (req: AuthRequest, res: Response) => {
  const parsed = createTaskSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

  const task = await taskService.create(req.userId!, parsed.data);
  return res.status(201).json({ task });
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;

  const task = await taskService.getById(req.userId!, id);
  if (!task) return res.status(404).json({ error: "Not found" });

  return res.status(200).json({ task });
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;

  const parsed = updateTaskSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid input" });

  const task = await taskService.update(req.userId!, id, parsed.data);

  if (!task) return res.status(404).json({ error: "Not found" });

  return res.status(200).json({ task });
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  const deleted = await taskService.remove(req.userId!, id);

  if (!deleted) return res.status(404).json({ error: "Not found" });

  return res.status(200).json({ ok: true });
};
