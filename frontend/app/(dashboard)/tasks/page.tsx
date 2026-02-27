"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TaskStatusTabs from "@/components/TaskStatusTabs";
import TaskCards from "@/components/TaskCards";
import { Task, TaskQueryParams } from "@/lib/types";
import { task, toggleTask } from "@/lib/task";

const MyTasks: React.FC = () => {
  const router = useRouter();

  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllTasks = async ({
    filterStatus,
    searchQuery,
    page,
  }: TaskQueryParams) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "9",
      });

      if (filterStatus !== "All") params.append("status", filterStatus);
      if (searchQuery) params.append("q", searchQuery);

      const data = await task(params);
      setAllTasks(data.items || []);
      setPages(data.pages);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (taskData: Task) => {
    router.push(`/create?taskId=${taskData.id}`);
  };

  const handleToggle = async (id: string) => {
    await toggleTask(id);
    setAllTasks((prev) => prev.map((task) => task.id === id && {...task, status: "DONE" }));
  };

  useEffect(() => {
    getAllTasks({ filterStatus, searchQuery, page });
  }, [filterStatus, searchQuery, page]);

  return (
    <div className={`my-5 flex flex-col page-enter page-enter-active min-h-screen`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-xl font-medium">My Tasks</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input"
          />
        </div>
        <div className="flex items-center md:justify-end gap-3 md:col-span-1">
          <TaskStatusTabs
            tabs={[
              { label: "All" },
              { label: "PENDING" },
              { label: "IN_PROGRESS" },
              { label: "DONE" },
            ]}
            activeTab={filterStatus}
            setActiveTab={setFilterStatus}
          />
        </div>
      </div>

      <main className="grow">
        {loading ? (
          <div className="flex justify-center items-center mt-8">
            <span className="loader-spinner" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {allTasks?.map((item) => (
              <TaskCards
                key={item.id}
                title={item.title}
                description={item.description}
                status={item.status}
                dueDate={item.dueDate}
                createdAt={item.createdAt}
                onClick={() => handleClick(item)}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        )}
      </main>

      <footer className={`flex justify-center items-center gap-4 py-2 border-t border-border-secondary text-text-secondary md:mt-2 mt-8`}>
        <button
          className="btn btn-outline"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span>
          Page {page} / {pages}
        </span>
        <button
          className="btn btn-outline"
          disabled={page >= pages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </footer>
    </div>
  );
};

export default MyTasks;
