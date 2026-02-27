import { TaskCardsProps } from "@/lib/types";

const TaskCards: React.FC<TaskCardsProps> = ({
  title,
  description,
  status,
  dueDate,
  createdAt,
  onClick,
  onToggle,
}) => {
  const getStatusTagColor = () => {
    switch (status) {
      case "IN_PROGRESS":
        return "text-warning bg-warning/15 border border-cyan-warning";
      case "DONE":
        return "text-success bg-success/15 border border-success";
      default:
        return "text-error bg-error/15 border border-error";
    }
  };

  return (
    <div
      className="bg-bg-secondary rounded-xl py-4 shadow-md shadow-bg-tertiary border border-border-primary cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-3 px-4">
        <div
          className={`text-[11px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded`}
        >
          {status}
        </div>

        <label
          className="relative inline-flex h-5 w-5 items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            onChange={onToggle}
            aria-label="Mark task completed"
            className="peer absolute h-5 w-5 cursor-pointer opacity-0"
          />

          <span
            className="relative inline-block h-5 w-5 rounded-md border-2 border-border-secondary transition-all duration-200 peer-checked:bg-success peer-checked:border-transparent peer-checked:shadow-[0_4px_12px_rgba(34,197,94,0.35)] checkbox-check"
            aria-hidden="true"
          />
        </label>
      </div>

      <div
        className={`px-4 border-l-[3px] ${
          status === "IN_PROGRESS"
            ? "border-warning"
            : status === "DONE"
            ? "border-success"
            : "border-error"
        }`}
      >
        <p className="text-sm font-medium text-text-primary mt-4 line-clamp-2">
          {title}
        </p>

        <p className="text-xs text-text-secondary mt-1.5 line-clamp-2 leading-4.5">
          {description}
        </p>
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between my-1">
          <div>
            <label className="text-xs text-text-tertiary">Start Date</label>
            <p className="text-[13px] font-semibold text-text-tertiary">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <label className="text-xs text-text-tertiary">Due Date</label>
            <p className="text-[13px] font-semibold text-text-tertiary">
              {new Date(dueDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCards;
