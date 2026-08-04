import { toDecimal } from "@/shared/utils/prismaDecimal";
import { IServiceOrder, IServiceOrderItem } from "../domain/types/order.types";
import { Prisma, ServiceOrderItem, Task } from "@prisma/client";

export function toJsonValue(
  obj: unknown,
  context: "create" | "update" = "create"
): Prisma.JsonValue {
  if (
    obj === null ||
    typeof obj === "string" ||
    typeof obj === "number" ||
    typeof obj === "boolean"
  ) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((v) => toJsonValue(v, context));
  }

  if (typeof obj === "object" && obj !== null) {
    const res: Prisma.JsonObject = {};
    for (const key in obj as Record<string, unknown>) {
      res[key] = toJsonValue((obj as Record<string, unknown>)[key], context);
    }
    return res;
  }

  // fallback pentru null
  return context === "update" && null;
}

export function ServiceOrderItemMapper(
  result: IServiceOrderItem
): Omit<ServiceOrderItem, "id"> {
  return {
    name: result.name,
    quantity: result.quantity,
    type: result.type ?? "OTHER",
    showPrice: result.type !== "STANDARD",
    unitPrice: toDecimal(result.unitPrice) || null,
    totalPrice: toDecimal(result.totalPrice) || null,
    metadata: result.metadata ? toJsonValue(result.metadata) : null,
    isDeleted: result.isDeleted ?? false,
    createdAt: result.createdAt ?? new Date(),
    updatedAt: result.updatedAt ?? new Date(),
    deletedAt: result.deletedAt || null,
    orderId: result.orderId,
    description: result.description ?? null,
    discussionId: null,
  };
}

export function mappedTasks(tasks: IServiceOrder): Omit<Task, "id">[] | [] {
  if (!tasks?.tasks?.length) return [];
  return tasks.tasks.map((task) => ({
    id: task.id,
    title: task.title,
    status: task.status || "NOT_STARTED",
    orderId: task.orderId || "",
    createdAt: task.createdAt,
    updatedAt: task.updatedAt || null,
    orderItemId: task.orderItemId || null,
    assigneeId: task.assigneeId || null,
    githubIssueId: task.githubIssueId || null,
    githubUrl: task.githubUrl || null,
  }));
}
