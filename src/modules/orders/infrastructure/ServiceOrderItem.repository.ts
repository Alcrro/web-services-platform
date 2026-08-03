import { Prisma, PrismaClient } from "@prisma/client";
import { ServiceOrderItemRepository } from "../domain/orderItem.repository.interface";
import { IServiceOrderItem } from "../domain/types/order.types";
import {
  serviceOrderItemMapperDocToDom,
  serviceOrderItemMapperDomToDoc,
  serviceOrderItemPartialMapperDomToDoc,
} from "@/modules/services/infrastructure/serviceMapper";
import { IFilters } from "@/modules/globals/types/types";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export class ServiceOrderItemImpl implements ServiceOrderItemRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(orderItem: IServiceOrderItem): Promise<IServiceOrderItem> {
    try {
      const orderItemData = serviceOrderItemMapperDomToDoc(orderItem);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { metadata: _metadata, id, ...rest } = orderItemData;
      const result = await this.db.serviceOrderItem.create({
        data: rest,
      });

      return serviceOrderItemMapperDocToDom(result);
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        console.error("Prisma validation error:", error.message);
        throw new Error(
          "Invalid data for ServiceOrderItem. Check your fields."
        );
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
  async findOne(itemId: string): Promise<IServiceOrderItem | null> {
    try {
      const result = await this.db.serviceOrderItem.findUnique({
        where: { id: itemId },
      });

      if (!result) {
        return null;
      }
      return serviceOrderItemMapperDocToDom(result);
    } catch (error) {
      console.log(error);
      throw new Error("Method not implemented.");
    }
  }
  async findAll(
    options: IFilters<IServiceOrderItem>
  ): Promise<IServiceOrderItem[] | null> {
    try {
      const { filters = {}, page, limit = 15, orderBy } = options || {};
      const skip = (page! - 1) * limit;

      const prismaOrderBy:
        | Prisma.ServiceOrderItemOrderByWithRelationInput
        | Prisma.ServiceOrderItemOrderByWithRelationInput[]
        | undefined = orderBy
        ? Object.entries(orderBy).reduce((acc, [key, value]) => {
            if (typeof value === "object" || value !== null) {
              acc[
                key as keyof Prisma.ServiceOrderItemOrderByWithRelationInput
              ] = value;
            }

            return acc;
          }, {} as Prisma.ServiceOrderItemOrderByWithRelationInput)
        : undefined;
      const result = await this.db.serviceOrderItem.findMany({
        where: filters,
        take: limit,
        skip,
        orderBy: prismaOrderBy,
      });

      if (!result) {
        return null;
      }

      return result.map(serviceOrderItemMapperDocToDom);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Internal db error.");
    }
  }
  async update(
    orderId: string,
    data: Partial<IServiceOrderItem>
  ): Promise<IServiceOrderItem> {
    try {
      const serviceOrderItemData = serviceOrderItemPartialMapperDomToDoc(data);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { metadata: _metadata, ...rest } = serviceOrderItemData;
      const result = await this.db.serviceOrderItem.update({
        where: { id: orderId },
        data: { ...rest },
      });
      return serviceOrderItemMapperDocToDom(result);
    } catch (error) {
      console.log(error);
      throw new Error("Method not implemented.");
    }
  }
}
