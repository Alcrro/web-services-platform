import { TaskRepository } from "../../domain/task.repository.interface";
import { IFiltersTasks, ITask } from "../../domain/types/task.types";
import { UserRepository } from "@/modules/users/domain/user.repository.interface";
import { IFilterOption, IMetaPagination } from "@/modules/globals/types/types";
import { ITaskDTO } from "../dto/task.ui.types";
import { taskDTO } from "../mapper/taskDTO";
import { ClientRepository } from "@/modules/clients/domain/repositories/client.repository.interface";

export class FindTasksByOrder {
  constructor(
    private readonly taskRepo: TaskRepository,
    private readonly userRepo: UserRepository,
    private readonly clientRepo: ClientRepository
  ) {}

  async execute(
    userId: string,
    options?: IFiltersTasks
  ): Promise<{ data: ITaskDTO[]; meta: IMetaPagination }> {
    // return this.taskRepo.(orderId);

    const page = options?.page ?? 1;
    const limit = options?.limit ?? 12;

    console.log({ options });

    const orders = await this.ensureClient(userId);

    if (!orders || orders.length === 0)
      throw new Error("You dont have orders yet");
    // 2️⃣ Collect all order IDs
    const orderIds = orders.map((o) => o.id);

    // 3️⃣ Query tasks filtered by order IDs + optional filters
    const { data, total } = await this.taskRepo.findAll({
      ...options,
      page,
      limit,
      filters: {
        ...options?.filters,
        orderId: orderIds, // taskRepo should handle array of IDs
      } as IFilterOption<ITask>,
    });
    const tasksDTO = data.map(taskDTO);
    return {
      data: tasksDTO,
      meta: { page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async ensureClient(userId: string) {
    const user = await this.userRepo.findOne(userId);

    if (!user) throw new Error("User not found");

    if (!user.clientId)
      throw new Error("Client isn't associate with account yet!");

    const client = await this.clientRepo.findById(user.clientId);

    return client?.orders;
  }
}
