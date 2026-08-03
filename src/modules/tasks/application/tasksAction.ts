import { getSession } from "@/shared/utils/getSession";
import { TaskAPI } from "../infrastructure/task.api";
import { ITaskDTO } from "./dto/task.ui.types";
import { IMetaPagination } from "@/modules/globals/types/types";

export class TasksAction {
  private taskAPI: TaskAPI;
  constructor() {
    this.taskAPI = new TaskAPI();
  }

  async getAllTasks(
    options: Record<string, string | string[]>
  ): Promise<{ data: ITaskDTO[]; meta: IMetaPagination }> {
    const token = await getSession();

    if (!options.page) options.page = "1";
    if (!options.limit) options.limit = "12";

    const { data, meta } = await this.taskAPI.getTasks(token, options);

    return { data, meta };
  }
}
