import { Prisma, PrismaClient } from "@prisma/client";
import { OrderRepository } from "../domain/order.repository.interface";
import {
  IFiltersServiceOrders,
  IOrdersQueryParams,
  IServiceOrder,
  IServiceOrderStatus,
  statusOrderByMapperURLToBackend,
} from "../domain/types/order.types";
import {
  serviceOrderMapperDocToDom,
  serviceOrderMapperDomainToDoc,
} from "./serviceOrderMapper";
import { IFilterOption, IOrderBy } from "@/modules/globals/types/types";
import { buildPrismaFilters } from "@/shared/utils/filters/buildPrismaFilters";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import type {
  IWorkspaceProjectDetail,
  IWorkspaceProjectListItem,
} from "../domain/types/workspace.types";
import {
  mapWorkspaceDetail,
  mapWorkspaceListItem,
} from "./workspace.mapper";

export class OrderRepositoryImplementation implements OrderRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(order: IServiceOrder): Promise<IServiceOrder> {
    try {
      const dataMapped = serviceOrderMapperDomainToDoc(order);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _id, ...dataWithoutId } = dataMapped;
      const result = await this.db.serviceOrder.create({ data: dataWithoutId });

      return serviceOrderMapperDocToDom(result);
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        console.error("Prisma validation error: ", error.message);
        throw new Error("Invalid data for ServiceOrderItem. Check your fields");
      }
      if (error instanceof PrismaClientKnownRequestError) {
        console.error("Prisma known request error:", error.code, error.message);
        throw new Error("Database request failed. Contact support.");
      }

      console.error("Unknown error:", error);
      throw new Error(
        "Something went wrong while creating the ServiceOrderItem."
      );
    }
  }

  async getAll(
    options?: IFiltersServiceOrders
  ): Promise<{ data: IServiceOrder[]; total: number }> {
    try {
      const {
        filters = {} as IFilterOption<IServiceOrder>,
        page,
        limit = 10,
        orderBy = {} as IOrderBy<IServiceOrder>,
      } = options || {};

      const skip = (page! - 1) * limit;
      // Suppose orderByPrisma is dynamically built
      let orderByPrisma: Prisma.ServiceOrderByWithAggregationInput | undefined =
        undefined;

      if (orderBy?.field) {
        orderByPrisma = {
          [orderBy.field]: orderBy.direction || "asc",
        };
      }

      const filtersPrisma = buildPrismaFilters<IServiceOrder>(
        filters,
        "serviceOrder"
      );
      console.log({ filtersPrisma });

      console.time("prismaQuery");
      const [data, total] = await Promise.all([
        this.db.serviceOrder.findMany({
          where: filtersPrisma,
          skip,
          ...(limit && limit > 0 ? { take: limit } : {}),
          ...(orderByPrisma ? { orderBy: orderByPrisma } : {}),
          include: {
            client: true,
            service: true,
            items: true,
            tasks: true,
          },
        }),
        this.db.serviceOrder.count({ where: filtersPrisma }),
      ]);
      console.timeEnd("prismaQuery");
      const result = data.map(serviceOrderMapperDocToDom);
      return { data: result, total };
    } catch (error) {
      throw error instanceof Error ? error : new Error("Internal db error");
    }
  }
  async getAllWithParams(
    params: IOrdersQueryParams
  ): Promise<{ data: IServiceOrder[]; total: number }> {
    try {
      const page = params.page ?? 1;
      const limit = params.limit ?? 10;
      const skip = (page - 1) * limit;

      const where: Prisma.ServiceOrderWhereInput = {
        isDeleted: false,
        ...(params.status && {
          status: statusOrderByMapperURLToBackend[params.status],
        }),
        ...(params.service && { serviceUniqueId: params.service }),
        ...(params.search && {
          projectName: { contains: params.search, mode: "insensitive" },
        }),
        ...((params.dateFrom || params.dateTo) && {
          createdAt: {
            ...(params.dateFrom && { gte: new Date(params.dateFrom) }),
            ...(params.dateTo && { lte: new Date(params.dateTo) }),
          },
        }),
      };

      const orderByPrisma: Prisma.ServiceOrderOrderByWithRelationInput =
        params.orderby
          ? { [params.orderby]: params.direction ?? "asc" }
          : { createdAt: "desc" };

      const [data, total] = await Promise.all([
        this.db.serviceOrder.findMany({
          where,
          skip,
          take: limit,
          orderBy: orderByPrisma,
          include: { client: true, service: true, items: true, tasks: true },
        }),
        this.db.serviceOrder.count({ where }),
      ]);

      return { data: data.map(serviceOrderMapperDocToDom), total };
    } catch (error) {
      throw error instanceof Error ? error : new Error("Internal db error");
    }
  }

  async findById(orderId: string): Promise<IServiceOrder> {
    try {
      const result = await this.db.serviceOrder.findUnique({
        where: { id: orderId },
        include: {
          client: true,
          service: true,
          items: true,
          tasks: true,
        },
      });
      if (!result) throw new Error("order isn't in db");

      return serviceOrderMapperDocToDom(result);
    } catch (error) {
      throw error instanceof Error ? error : new Error("Internal db error");
    }
  }

  async updateStatus(orderId: string, status: IServiceOrderStatus): Promise<void> {
    try {
      await this.db.serviceOrder.update({
        where: { id: orderId },
        data: { status: status as import("@prisma/client").ServiceOrderStatus },
      });
    } catch (error) {
      throw error instanceof Error ? error : new Error("Internal db error");
    }
  }

  async updatePricing(orderId: string, initialPrice: number, totalPrice: number): Promise<void> {
    try {
      await this.db.serviceOrder.update({
        where: { id: orderId },
        data: {
          initialPrice: new Prisma.Decimal(initialPrice),
          totalPrice: new Prisma.Decimal(totalPrice),
        },
      });
    } catch (error) {
      throw error instanceof Error ? error : new Error("Internal db error");
    }
  }

  async getClientProjects(
    clientId: string
  ): Promise<IWorkspaceProjectListItem[]> {
    try {
      const orders = await this.db.serviceOrder.findMany({
        where: { clientId, isDeleted: false },
        orderBy: { createdAt: "desc" },
        include: {
          service: { select: { name: true } },
          tasks: { select: { status: true } },
          items: {
            where: { isDeleted: false },
            select: { tasks: { select: { status: true } } },
          },
        },
      });
      return orders.map(mapWorkspaceListItem);
    } catch (error) {
      throw error instanceof Error ? error : new Error("Internal db error");
    }
  }

  async getClientProjectDetail(
    clientId: string,
    orderId: string
  ): Promise<IWorkspaceProjectDetail | null> {
    try {
      const order = await this.db.serviceOrder.findFirst({
        where: { id: orderId, clientId, isDeleted: false },
        include: {
          service: {
            include: {
              serviceFeatures: {
                where: { isIncluded: true, isDeleted: false },
                include: { feature: true },
              },
            },
          },
          items: {
            where: { isDeleted: false },
            include: {
              tasks: {
                include: {
                  assignee: { select: { name: true } },
                  comments: true,
                },
              },
            },
          },
          tasks: {
            where: { orderItemId: null },
            include: {
              assignee: { select: { name: true } },
              comments: true,
            },
          },
        },
      });

      if (!order) return null;
      return mapWorkspaceDetail(order);
    } catch (error) {
      throw error instanceof Error ? error : new Error("Internal db error");
    }
  }
}
