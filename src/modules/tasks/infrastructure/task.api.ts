import axios from "axios";
import {
  CreateTaskDTO,
  ITask,
  UpdateTaskDTO,
} from "../domain/types/task.types";
import { BaseAPI } from "@/infrastructure/api/BaseAPI";
import { configureParams } from "@/services/api/services/servicesApi";
import { IMetaPagination } from "@/modules/globals/types/types";
import { ITaskDTO } from "../application/dto/task.ui.types";
import { mapSearchParamsOptions } from "@/modules/orders/infrastructure/searchParamsToFilter";

export class TaskAPI extends BaseAPI {
  protected BASE_PATH = "/api/services/tasks";

  async getTasks(
    accessToken: string | null,
    options: Record<string, string | string[]>
  ): Promise<{ data: ITaskDTO[]; meta: IMetaPagination }> {
    const optionsS = mapSearchParamsOptions<ITask>(options);

    const urlConfigured = configureParams<ITask>(optionsS);

    return this.request(`${urlConfigured}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }
  async getTask(id: string, accessToken: string): Promise<ITask> {
    const response = await fetch(`${this.API_URL}/api/services/tasks/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return await response.json();
  }

  async createTask(data: CreateTaskDTO, accessToken: string): Promise<ITask> {
    const response = await axios.post(
      `${this.API_URL}/api/services/tasks`,
      data,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  }

  async updateTask(
    id: string,
    data: UpdateTaskDTO,
    accessToken: string
  ): Promise<ITask> {
    const response = await axios.put(
      `${this.API_URL}/api/services/tasks/${id}`,
      data,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  }

  async deleteTask(
    id: string,
    accessToken: string
  ): Promise<{ success: boolean }> {
    const response = await axios.delete(
      `${this.API_URL}/api/services/tasks/${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  }
}
