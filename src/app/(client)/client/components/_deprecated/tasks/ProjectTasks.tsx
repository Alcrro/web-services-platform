import Tasks from "./Tasks";
import SingleTaskView from "./SingleTaskView";

const ProjectTasks = async ({
  searchParams = {},
  taskId,
}: {
  params?: string[];
  searchParams?: Record<string, string | string[]>;
  taskId?: string;
}) => {
  if (taskId) {
    // You can render a separate component for a single task
    return <SingleTaskView taskId={taskId} />;
  }

  return (
    <div>
      ProjectTasks
      <div className="tasks_container ">
        <Tasks searchParams={searchParams} />
      </div>
    </div>
  );
};

export default ProjectTasks;
