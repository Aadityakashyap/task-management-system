"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { successToast, errorToast } from "@/lib/toast";
import { create, deleteByID, detailsByID, update } from "@/lib/task";

const CreateTask = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().slice(0, 10) ?? ""
  );
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(false);

  const createTask = async (payload: any) => {
    await create(payload);
    successToast("Task created");
    router.replace("/tasks");
  };

  const updateTask = async (updated: any) => {
    await update(updated, taskId);
    successToast("Task updated");
    router.replace("/tasks");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (taskId) {
      await updateTask({
        title,
        description: description,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        status,
      }).finally(() => setLoading(false));
    } else {
      await createTask({
        title,
        description: description || undefined,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        status,
      }).finally(() => setLoading(false));
    }
  };

  const getTaskDetailsByID = async () => {
    const data = await detailsByID(taskId);
    setTitle(data?.task?.title);
    setDescription(data?.task?.description);
    setStatus(data?.task?.status);
    setDueDate(new Date(data?.task?.dueDate).toISOString().split("T")[0]);
  };

  const deleteTask = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    try {
      await deleteByID(id);
      successToast("Task deleted");
      router.push("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
      errorToast("Error deleting task");
    }
  };

  const cancelTask = () => {
    router.replace("/tasks");
  };

  useEffect(() => {
    if (!taskId) return;

    const fetchTask = async () => {
      await getTaskDetailsByID();
    };

    fetchTask();
  }, [taskId]);

  return (
    <div className="my-5 flex flex-col page-enter page-enter-active">
      <div className="grid grid-cols-1 mt-4">
        <div className="form-card col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-xl font-medium">
              {taskId ? "Update Task" : "Create Task"}
            </h2>

            {taskId && (
              <button className="btn-logout" onClick={() => deleteTask(taskId)}>
                Delete
              </button>
            )}
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-text-secondary">
              Task Title
            </label>

            <input
              placeholder="Create Task"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-text-secondary">
              Description
            </label>

            <textarea
              placeholder="Describe Task"
              className="form-input"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-6 md:col-span-6">
              <label className="text-sm font-medium text-text-secondary">
                Status
              </label>

              <div>
                <select
                  className="form-input cursor-pointer"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>
              </div>
            </div>

            <div className="col-span-6 md:col-span-6">
              <label className="text-sm font-medium text-text-secondary">
                Due Date
              </label>

              <input
                placeholder="Select Date"
                className="form-input cursor-pointer"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                type="date"
                onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
              />
            </div>
          </div>

          <div
            className={`mt-12 ${
              taskId ? "grid grid-cols-4 gap-2" : "flex justify-center"
            }`}
          >
            {!taskId ? (
              <button
                className="btn gradiant cursor-pointer hover:opacity-80 text-white w-full"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "CREATING..." : "CREATE TASK"}
              </button>
            ) : (
              <>
                <button
                  className={`btn gradiant cursor-pointer hover:opacity-80 text-white w-full ${
                    taskId && "col-span-2 md:col-span-3"
                  }`}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "UPDATING..." : "UPDATE TASK"}
                </button>
                <button
                  className={`btn bg-error cursor-pointer hover:opacity-80 text-white w-full ${
                    taskId && "col-span-2 md:col-span-1"
                  }`}
                  onClick={cancelTask}
                  disabled={loading}
                >
                  CANCEL
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
