import { PrismaClient } from "@prisma/client";
import { UiNotificationOutput } from "../../application/dto/NotificationOutput";
import { UiNotificationPublisher } from "../../application/ports/UiNotificationPublisher";
import { uiNotificationDomToDoc } from "../mapper/uiNotificationPersistence.mapper";

export class DBUiNotificationPublisher implements UiNotificationPublisher {
  constructor(private readonly prisma: PrismaClient) {}
  async publisher(notification: UiNotificationOutput): Promise<void> {
    const persistenceObj = uiNotificationDomToDoc(notification);
    await this.prisma.uiNotification.create({
      data: persistenceObj,
    });
  }
}
