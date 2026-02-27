import { apiFetch } from "./api";

export const task = (params: any): Promise<any> =>
  apiFetch(`/tasks?${params.toString()}`, {
    method: "GET",
  });

export const create = (payload: any) =>
  apiFetch("/tasks", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const update = (updated: any, taskId: any) =>
  apiFetch(`/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(updated),
  });

export const detailsByID = (taskId: any): Promise<any> =>
  apiFetch(`/tasks/${taskId}`);

export const deleteByID = (id: any) =>
  apiFetch(`/tasks/${id}`, {
    method: "DELETE",
  });

export const toggleTask = (taskId: string) =>
  apiFetch(`/tasks/${taskId}/toggle`, {
    method: "PATCH",
  });
