import { STATUS_TASKS_ICON_MAP } from "@/shared/data/mappers/orderTasksStatusIconMapper";

import style from "@/components/styles/tasksList.module.scss";
import { ITaskDTO } from "@/modules/tasks/application/dto/task.ui.types";
const TaskItemSkeleton = ({ tasks }: { tasks: ITaskDTO[] }) => {
  return (
    <div
      className={`${style.tasks_list} grid gap-2 p-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-h-[420px] max-h-[490px] h-full overflow-y-auto`}
    >
      {tasks.map((task, key) => {
        const status = STATUS_TASKS_ICON_MAP[task.status];
        if (!status) return null;
        const { Icon } = status;

        return (
          <div
            key={key}
            className="flex flex-col gap-2 bg-(--color-bg) rounded-lg p-2 max-h-fit"
          >
            <div className="flex justify-between">
              <div title={task.status}>
                <Icon
                  className={` text-transparent animate-pulse bg-gray-500 rounded-xl
                 w-5 h-5 `}
                />
              </div>
              <div
                className={
                  "text-transparent animate-pulse bg-gray-500 rounded-xl w-fit"
                }
              >
                {task.title}{" "}
              </div>
            </div>
            <div
              className={
                "text-transparent animate-pulse bg-gray-500 rounded-xl w-fit"
              }
            >
              {!task.order ? "-" : `# ${task.order.orderNo}`}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskItemSkeleton;
