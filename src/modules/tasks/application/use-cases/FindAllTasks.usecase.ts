import { IMetaPagination } from "@/modules/globals/types/types";
import { TaskRepository } from "../../domain/task.repository.interface";
import { IFiltersTasks } from "../../domain/types/task.types";
import { ITaskDTO } from "../dto/task.ui.types";
import { taskDTO } from "../mapper/taskDTO";

export class FindAllTasks {
  constructor(private readonly tasksRepo: TaskRepository) {}

  async execute(
    options: IFiltersTasks
  ): Promise<{ data: ITaskDTO[]; meta: IMetaPagination }> {
    const page = options?.page ?? 1;
    const limit = options?.limit ?? 12;
    const { data, total } = await this.tasksRepo.findAll(options);

    const tasksDTO = data.map(taskDTO);
    return {
      data: tasksDTO,
      meta: { page, limit, totalPages: Math.ceil(total / limit) },
    };
  }
}
