import {
  IServiceOrder,
  IServiceOrderItem,
} from "../../domain/types/order.types";
import { OrderRepository } from "./../../domain/order.repository.interface";
import { ServiceOrderItemRepository } from "../../domain/orderItem.repository.interface";
import { TaskRepository } from "@/modules/tasks/domain/task.repository.interface";
import { GithubServices } from "@/modules/features/github/application/usecase/GithubServices";
import { useGithubIssueTemplate } from "../../../../shared/data/consts/githubIssuesTemplate/useGithubIssueTemplate";
import { LABELS } from "@/shared/data/consts/githubIssuesTemplate/labels/labels";
import { clientDetailsVerification } from "@/modules/clients/application/validators/client.validators";
import { ClientRepository } from "@/modules/clients/domain/repositories/client.repository.interface";

export class CreateOrder {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly clientRepository: ClientRepository,
    private readonly serviceOrderItemRepository: ServiceOrderItemRepository,
    private readonly gitHubService: GithubServices,
    private readonly taskRepository: TaskRepository
  ) {}

  async execute(order: IServiceOrder): Promise<void> {
    this.validate(order);

    // Ensure client exists
    const client = await this.ensureClient(order.client);

    // Create order
    const createOrder = await this.orderRepository.create({
      ...order,
      clientId: client.id!,
    });

    if (!order.items || order.items.length === 0) {
      throw new Error("No items in the order");
    }

    // Process each item
    for (const item of order.items) {
      await this.processItem(item, createOrder.id);

      const template = useGithubIssueTemplate[item.uniqueId!];

      if (template) {
        await this.gitHubService.ensureAllLabels(LABELS); // run only once after repo creation
        await this.gitHubService.createFeatureIssues(createOrder.id, template);
      }
    }
  }

  private async ensureClient(clientData: IServiceOrder["client"]) {
    if (!clientData) throw new Error("Client details fields aren't completed");
    let client = await this.clientRepository.findByEmail(clientData?.email);
    if (!client) client = await this.clientRepository.create(clientData);

    return client;
  }

  private async processItem(item: IServiceOrderItem, orderId: string) {
    // 🔹 Create service order item
    const serviceOrderItem = await this.serviceOrderItemRepository.create({
      ...item,
      orderId,
    });

    const tasks = await this.taskRepository.create({
      title: serviceOrderItem.name,
      status: "NOT_STARTED",
      createdAt: new Date(),
      orderId: serviceOrderItem.orderId,
      orderItemId: serviceOrderItem.id,
    });

    return { serviceOrderItem, tasks };
  }

  private validate(order: IServiceOrder): void {
    if (!order.serviceId) throw new Error("Service id is required");
    if (!order.client?.name || !order.client?.email)
      throw new Error("Client name and email are required");
    clientDetailsVerification({
      name: order.client?.name,
      email: order.client.email,
      phone: order.client.phone ?? "",
    });
  }
}
