import { Prisma, PrismaClient } from "@prisma/client";
import { IClient, ICLientFIlters, IClientsStats } from "../domain/types/client.types";
import { clientMapperDocToDom } from "./client.mapper";
import { ClientRepository } from "../domain/repositories/client.repository.interface";

class NotFoundError extends Error {}
class RepositoryError extends Error {}
export class ClientRepositoryImpl implements ClientRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(client: IClient): Promise<IClient> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const clientData = (({ orders: _orders, ...rest }) => rest)(client);
      const newClient = await this.db.client.upsert({
        where: { email: client.email },

        create: clientData,
        update: clientData,
        include: { orders: true },
      });

      return clientMapperDocToDom(newClient);
    } catch (error) {
      console.error("Error creating client:", error);
      throw new RepositoryError("Failed to create client");
    }
  }
  async findById(clientId: string): Promise<IClient | null> {
    try {
      const result = await this.db.client.findUnique({
        where: { id: clientId.toString() },
        include: { orders: true },
      });
      if (!result) {
        return null;
      }

      return clientMapperDocToDom(result);
    } catch (error) {
      console.error("ClientRepository.getOne error:", error);
      if (error instanceof NotFoundError) throw error;
      throw new RepositoryError("Failed to get client");
    }
  }
  async getAll(
    options?: ICLientFIlters
  ): Promise<{ data: IClient[]; total: number }> {
    try {
      const { filters = {}, page, limit = 15, orderBy } = options || {};
      const skip = (page! - 1) * limit;

      const prismaOrderBy:
        | Prisma.ClientOrderByWithRelationInput
        | Prisma.ClientOrderByWithRelationInput[]
        | undefined = orderBy
        ? Object.entries(orderBy).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              acc[key as keyof Prisma.ClientOrderByWithRelationInput] = value;
            }

            return acc;
          }, {} as Prisma.ClientOrderByWithRelationInput)
        : undefined;
      const [data, total] = await Promise.all([
        await this.db.client.findMany({
          where: filters,
          take: limit,
          skip,
          orderBy: prismaOrderBy,
        }),
        this.db.client.count({ where: filters }),
      ]);

      if (!data) {
        throw new Error("Clients cannot be found!");
      }

      const dataResult = data.map(clientMapperDocToDom);
      return { data: dataResult, total };
    } catch (error) {
      console.error("Error creating client:", error);
      throw new Error("Failed to find all clients");
    }
  }

  async findByEmail(email: string): Promise<Partial<IClient> | null> {
    try {
      const result = await this.db.client.findUnique({
        where: { email },
      });
      if (!result) {
        return null;
      }
      return clientMapperDocToDom(result);
    } catch (error) {
      console.error("Error creating client:", error);
      throw new Error("Failed to find all clients");
    }
  }

  async update(
    clientId: string,
    data?: Partial<IClient>
  ): Promise<Partial<IClient>> {
    if (!data) throw new RepositoryError("No data provided to update client");

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const clientData = (({ orders: _orders, ...rest }) => rest)(data);
      const result = await this.db.client.update({
        where: { id: clientId },
        data: clientData,
      });

      return result as Partial<IClient>;
    } catch (error) {
      console.error("ClientRepository.update error:", error);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        throw new NotFoundError(`Client with ID ${clientId} not found`);
      }
      throw new RepositoryError("Failed to update client");
    }
  }
  async getStats(): Promise<IClientsStats> {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [totalClients, activeClients, totalOrders, newLast30Days] =
      await Promise.all([
        this.db.client.count({ where: { isDeleted: false } }),
        this.db.client.count({
          where: {
            isDeleted: false,
            orders: { some: { isDeleted: false } },
          },
        }),
        this.db.serviceOrder.count({ where: { isDeleted: false } }),
        this.db.client.count({
          where: { isDeleted: false, createdAt: { gte: thirtyDaysAgo } },
        }),
      ]);

    return {
      totalClients,
      activeClients,
      inactiveClients: totalClients - activeClients,
      newLast30Days,
      totalOrders,
    };
  }

  async delete(clientId: string): Promise<Partial<IClient>> {
    try {
      const result = await this.db.client.delete({
        where: { id: clientId },
      });

      return clientMapperDocToDom(result);
    } catch (error) {
      console.error("ClientRepository.update error:", error);

      throw new RepositoryError("Failed to update client");
    }
  }
}
