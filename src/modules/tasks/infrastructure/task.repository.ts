import { TaskRepository } from "../domain/task.repository.interface";
import { IFiltersTasks, ITask } from "../domain/types/task.types";
import { PrismaClient } from "@prisma/client";
import {
  taskMapperDocToDom,
  taskMapperPartialDomToDoc,
  transformOrderItemIntoTask,
} from "./task.mapper";
import { buildPrismaFilters } from "@/shared/utils/filters/buildPrismaFilters";

export class TaskRepositoryImpl implements TaskRepository {
  constructor(private readonly db: PrismaClient) {}
  async create(item: ITask): Promise<ITask> {
    try {
      const itemData = transformOrderItemIntoTask(item);
      const result = await this.db.task.create({
        data: itemData,
      });

      return taskMapperDocToDom(result);
    } catch (error) {
      console.log(error);

      throw new Error("Internal db error!");
    }
  }
  async findOne(taskId: string): Promise<ITask | null> {
    try {
      const result = await this.db.task.findUnique({
        where: { id: taskId },
        include: { order: true },
      });

      if (!result) return null;
      return taskMapperDocToDom(result);
    } catch (error) {
      console.log(error);

      throw new Error("Internal db error");
    }
  }
  async findAll(
    options: IFiltersTasks
  ): Promise<{ data: ITask[]; total: number }> {
    try {
      const prismaFilter = buildPrismaFilters<ITask>(options.filters, "task");
      const skip = (options.page! - 1) * options.limit!;
      console.log(prismaFilter);

      const [data, total] = await Promise.all([
        this.db.task.findMany({
          where: prismaFilter,
          skip,
          ...(options.limit && options.limit > 0
            ? { take: options.limit }
            : {}),
          include: { order: true },
        }),
        this.db.task.count({ where: prismaFilter }),
      ]);

      return { data: data.map(taskMapperDocToDom), total };
    } catch (error) {
      console.log(error);

      throw new Error("Internal db error");
    }
  }
  async update(taskId: string, task: Partial<ITask>): Promise<ITask> {
    try {
      const data = taskMapperPartialDomToDoc(task);
      const result = await this.db.task.update({
        where: { id: taskId },
        data,
        include: { order: true },
      });

      return taskMapperDocToDom(result);
    } catch (error) {
      console.log(error);

      throw new Error("internal db error");
    }
  }
}
