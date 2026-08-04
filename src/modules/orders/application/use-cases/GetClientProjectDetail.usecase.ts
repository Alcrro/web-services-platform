import { OrderRepository } from "../../domain/order.repository.interface";
import type { IWorkspaceProjectDetail } from "../../domain/types/workspace.types";

export class GetClientProjectDetailUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    clientId: string,
    orderId: string
  ): Promise<IWorkspaceProjectDetail> {
    const project = await this.orderRepository.getClientProjectDetail(
      clientId,
      orderId
    );

    if (!project) throw new Error("Project not found or access denied");

    return project;
  }
}
