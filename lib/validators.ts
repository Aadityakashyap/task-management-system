import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const taskCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "DONE"]).optional(),
});

export const taskUpdateSchema = taskCreateSchema.partial();

export const taskQuerySchema = z.object({
  page: z.string().optional(),
  q: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "DONE"]).optional(),
  limit: z.string().optional(),
});
