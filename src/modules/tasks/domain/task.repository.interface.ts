import { IFiltersTasks, ITask } from "./types/task.types";

export interface TaskRepository {
  create(item: ITask): Promise<ITask>;
  findOne(taskId: string): Promise<ITask | null>;
  findAll(opt: IFiltersTasks): Promise<{ data: ITask[]; total: number }>;
  update(taskId: string, data: Partial<ITask>): Promise<ITask>;
}
