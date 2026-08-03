import { OrderRepository } from "@/modules/orders/domain/order.repository.interface";
import { TaskRepository } from "../../domain/task.repository.interface";
import { ITask } from "../../domain/types/task.types";

export class CreateTask {
  constructor(
    private readonly taskRepo: TaskRepository,
    private readonly orderRepo: OrderRepository
  ) {}
  async execute(orderId: string): Promise<void> {
    const order = await this.orderRepo.findById(orderId);

    if (!order || !order.items) {
      throw new Error("Order doesnt exist!");
    }

    for (const item of order.items) {
      const newTask: ITask = {
        title: item.name,
        status: "NOT_STARTED",
        createdAt: new Date(),
        orderId: order.id,
      };
      await this.taskRepo.create(newTask);
    }
  }
}
