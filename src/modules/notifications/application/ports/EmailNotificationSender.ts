import { EmailNotificationMessage } from "../dto/EmailNtificationMessage";

export interface EmailNotificationSender {
  send(notification: EmailNotificationMessage): Promise<void>;
}
