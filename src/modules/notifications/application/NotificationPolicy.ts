import {
  notificationChannel,
  NotificationChannelType,
} from "./types/NotificationChannel";
import { notificationType, NotificationType } from "./types/NotificationType";

export class NotificationPolicy {
  static resolveChannels(type: NotificationType): NotificationChannelType[] {
    switch (type) {
      case notificationType.ORDER_ACCOUNT_LINK_REMINDER:
        return [notificationChannel.UI];

      case notificationType.ORDER_ACCOUNT_LINKED:
        return [notificationChannel.UI, notificationChannel.EMAIL];

      case notificationType.LOGIN_SUCCESS:
        return [notificationChannel.UI];
      default:
        return [];
    }
  }
}
