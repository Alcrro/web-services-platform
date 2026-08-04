import { OrderRepository } from "../../domain/order.repository.interface";
import type { IWorkspaceProjectListItem } from "../../domain/types/workspace.types";

export class GetClientProjectsUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(clientId: string): Promise<IWorkspaceProjectListItem[]> {
    return this.orderRepository.getClientProjects(clientId);
  }
}
