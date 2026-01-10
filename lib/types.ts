export interface Tab {
  label: string;
}

export type TaskStatusTabsProps = {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (label: string) => void;
};

export type TaskStatus = "IN_PROGRESS" | "DONE" | "PENDING" | string;

export interface TaskCardsProps {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  onClick?: () => void;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "DONE" | string;
  dueDate: string;
  createdAt: string;
}

export type Params = { params: { id: string } };

export interface TaskQueryParams {
  filterStatus: string;
  searchQuery: string;
  page: number;
}
