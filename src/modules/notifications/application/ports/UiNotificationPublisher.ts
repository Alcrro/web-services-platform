import { UiNotificationOutput } from "../dto/NotificationOutput";

export interface UiNotificationPublisher {
  publisher(notification: UiNotificationOutput): Promise<void>;
}
