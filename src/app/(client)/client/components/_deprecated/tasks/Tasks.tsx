import TasksList from "./TasksList";
import { TasksAction } from "@/modules/tasks/application/tasksAction";

const Tasks = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) => {
  const taskAction = new TasksAction();

  const tasks = await taskAction.getAllTasks(searchParams);

  return (
    <>
      <TasksList
        searchParams={searchParams}
        tasks={tasks.data}
        meta={tasks.meta}
      />
    </>
  );
};

export default Tasks;
