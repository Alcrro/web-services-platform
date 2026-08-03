import { ServiceOrder, Task } from "@prisma/client";
import { ITask } from "../domain/types/task.types";
import { serviceOrderMapperDocToDom } from "@/modules/orders/infrastructure/serviceOrderMapper";

export function transformOrderItemIntoTask(orderItem: ITask): Task {
  return {
    id: crypto.randomUUID(),
    title: orderItem.title,
    status: "NOT_STARTED",
    orderItemId: orderItem.id ?? null,
    orderId: orderItem.orderId ?? null,
    assigneeId: null,
    githubIssueId: null,
    githubUrl: null,
    createdAt: new Date(),
    updatedAt: null,
  };
}
export function taskMapperDocToDom(
  task: Task & { order?: ServiceOrder | null }
): ITask {
  return {
    id: task.id,
    title: task.title,
    status: task.status ?? "NOT_STARTED",
    createdAt: task.createdAt,
    orderId: task.orderId ?? "no order",
    orderItemId: task.orderItemId ?? "no order",
    order: task.order ? serviceOrderMapperDocToDom(task.order) : undefined,
  };
}
export function taskMapperDomToDoc(task: ITask): Task {
  return {
    id: task.id ?? crypto.randomUUID(),
    title: task.title,
    status: task.status ?? "NOT_STARTED",
    orderItemId: task.orderItemId ?? null,
    orderId: task.orderId ?? null,
    assigneeId: task.assigneeId ?? null,
    githubIssueId: task.githubIssueId ?? null,
    githubUrl: task.githubUrl ?? null,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt ?? null,
  };
}
export function taskMapperPartialDomToDoc(task: Partial<ITask>): Task {
  return {
    id: task.id ?? crypto.randomUUID(),
    title: task.title ?? "No title",
    status: task.status ?? "NOT_STARTED",
    orderItemId: task.orderItemId ?? null,
    orderId: task.orderId ?? null,
    assigneeId: task.assigneeId ?? null,
    githubIssueId: task.githubIssueId ?? null,
    githubUrl: task.githubUrl ?? null,
    createdAt: new Date(task.createdAt ?? new Date()) ?? null,
    updatedAt: task.updatedAt ?? null,
  };
}
