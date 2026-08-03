import { Prisma } from "@prisma/client";
import { UiNotificationOutput } from "../../application/dto/NotificationOutput";

export function uiNotificationDomToDoc(
  dto: UiNotificationOutput
): Prisma.UiNotificationUncheckedCreateInput {
  return {
    id: dto.id,
    type: dto.type,
    title: dto.title,
    message: dto.message,
    payload: dto.payload
      ? (dto.payload as Prisma.InputJsonValue)
      : Prisma.JsonNull,
    createdAt: dto.createdAt,
    read: dto.read,
  };
}
