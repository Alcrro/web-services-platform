import { ITask } from "../../domain/types/task.types";
import { ITaskDTO, TaskStatusMapperDTO } from "../dto/task.ui.types";

export function taskDTO(task: ITask): ITaskDTO {
  return {
    id: task.id,
    title: task.title,
    status: TaskStatusMapperDTO[task.status] ?? "not started",
    orderItemId: task.orderItemId,
    orderItem: task.orderItem,
    orderId: task.orderId,
    order: task.order,
    assigneeId: task.assigneeId,
    assignee: task.assignee,
    githubIssueId: task.githubIssueId,
    githubUrl: task.githubUrl,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}
