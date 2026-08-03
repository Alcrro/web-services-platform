import { API_URL } from "@/shared/config/env";
import { ITask } from "../domain/types/task.types";
import { configureParams } from "@/services/api/services/servicesApi";
import { ITaskDTO } from "../application/dto/task.ui.types";
import { IMetaPagination } from "@/modules/globals/types/types";
import { mapSearchParamsOptions } from "@/modules/orders/infrastructure/searchParamsToFilter";

export async function getTasksClient(
  options: Record<string, string | string[]>
): Promise<{
  data: ITaskDTO[];
  meta: IMetaPagination;
}> {
  const optionsS = mapSearchParamsOptions<ITask>(options);

  const urlConfigured = configureParams<ITask>(optionsS);

  const result = await fetch(`${API_URL}/api/services/tasks${urlConfigured}`, {
    method: "GET",
    credentials: "include",
  });

  const dataResult = await result.json();
  const { data, meta } = dataResult;
  return { data, meta };
}
