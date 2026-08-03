"use client";
import style from "@/components/styles/tasksList.module.scss";
import { STATUS_TASKS_ICON_MAP } from "@/shared/data/mappers/orderTasksStatusIconMapper";
import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { useTaskQuery } from "@/shared/hooks/reactQuery/tasksQuery";
import {
  ITaskDTO,
  TaskStatusMapperFrontendURL,
} from "@/modules/tasks/application/dto/task.ui.types";
import TaskItemSkeleton from "./TaskItemSkeleton";
import PaginationV2 from "@/components/ui/defaultTable/pagination/PavinationV2";
import { IMetaPagination } from "@/modules/globals/types/types";
import { useGoToPage } from "@/shared/utils/goToPage";

const TasksList = ({
  tasks,
  searchParams = {},
  meta,
}: {
  tasks: ITaskDTO[];

  searchParams?: Record<string, string | string[]>;
  meta: IMetaPagination;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const page = meta.page ?? 1;

  const goToPage = useGoToPage();
  const {
    data: reactQueryData,
    isPending,
    isLoading,
    isFetching,
  } = useTaskQuery(searchParams, { data: tasks, meta });

  const showSkeleton = isLoading || isPending || isFetching;

  if (!tasks || !reactQueryData) return <div>no task</div>;
  const filterHandle = (param: string) => {
    router.push(`${pathname.toString()}?filters=status&value=${param}`);
  };

  return (
    <>
      {!reactQueryData.data || reactQueryData.data.length === 0 ? (
        <div>no tasks</div>
      ) : (
        <>
          <div className="filters">
            status
            <select
              name="status"
              id=""
              onClick={(e) => filterHandle(e.currentTarget.value)}
            >
              {Object.entries(TaskStatusMapperFrontendURL).map(([key, val]) => (
                <option key={key} value={key} className="bg-(--color-bg)">
                  {val}
                </option>
              ))}
            </select>
          </div>
          {showSkeleton ? (
            <TaskItemSkeleton tasks={tasks} />
          ) : (
            <div
              className={`${style.tasks_list} grid gap-2 p-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-h-[420px] max-h-[490px] h-full overflow-y-auto`}
            >
              {reactQueryData.data.map((task, key) => {
                const status = STATUS_TASKS_ICON_MAP[task.status];
                if (!status) return null;

                const { Icon, colorClass, animated } = status;

                return (
                  <Link
                    href={`/client/control-panel/projects/tasks/${task.id}`}
                    key={key}
                    className="flex flex-col gap-2 bg-(--color-bg) rounded-lg p-2 relative z-10 max-h-fit"
                  >
                    {/* <Github className="absolute w-22 h-full" /> */}
                    <Image
                      src={"/images/github-mark.png"}
                      alt="github"
                      width={1000}
                      height={1000}
                      className="absolute z-0 opacity-40 w-16 left-1/2 top-1/2 -translate-1/2 hover:scale-125 duration-200 pointer-events-none"
                    />
                    <div className="flex justify-between relative z-10">
                      <div title={task.status}>
                        <Icon
                          className={`${colorClass} w-5 h-5 ${
                            animated ? "animate-pulse" : ""
                          }`}
                        />
                      </div>
                      <div className="font-semibold">{task.title} </div>
                    </div>
                    <div>{!task.order ? "-" : `# ${task.order.orderNo}`}</div>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      )}
      <PaginationV2
        currentPage={page}
        totalPages={meta.totalPages!}
        onPageChange={goToPage}
      />
    </>
  );
};

export default TasksList;
