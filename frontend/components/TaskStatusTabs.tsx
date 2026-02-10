import { TaskStatusTabsProps } from "@/lib/types";

const TaskStatusTabs: React.FC<TaskStatusTabsProps> = ({
  tabs,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div>
      <div className="flex flex-wrap xl:flex-nowrap gap-2 md:gap-0">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`relative px-3 md:px-4 py-2 text-sm font-medium ${
              activeTab === tab.label
                ? "text-text-primary btn-outline rounded-sm"
                : "text-text-tertiary hover:text-primary-accent-hover"
            } cursor-pointer`}
            onClick={() => setActiveTab(tab.label)}
          >
            <div className="flex items-center">
              <span className="text-xs">{tab.label}</span>
            </div>
            {activeTab === tab.label && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-accent-bg" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusTabs;
