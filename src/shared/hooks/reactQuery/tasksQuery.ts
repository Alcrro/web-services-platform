import { IMetaPagination } from "@/modules/globals/types/types";
import { ITaskDTO } from "@/modules/tasks/application/dto/task.ui.types";
import { getTasksClient } from "@/modules/tasks/infrastructure/task.client";
import { useQuery } from "@tanstack/react-query";

export function useTaskQuery(
  searchParams: Record<string, string | string[]>,
  initialData: { data: ITaskDTO[]; meta: IMetaPagination }
) {
  console.log(searchParams);

  return useQuery({
    queryKey: ["tasks", searchParams],
    queryFn: async () => await getTasksClient(searchParams),

    // staleTime: 1000 * 60,
    initialData,
    // refetchOnWindowFocus: true,
  });
}
