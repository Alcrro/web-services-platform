import { EmailNotificationMessage } from "../../application/dto/EmailNtificationMessage";
import { EmailNotificationSender } from "../../application/ports/EmailNotificationSender";

export class EmailNotificationSenderImpl implements EmailNotificationSender {
  async send(notification: EmailNotificationMessage): Promise<void> {
    // Implement actual sending logic here
    console.log("Sending email:", notification);
  }
}
