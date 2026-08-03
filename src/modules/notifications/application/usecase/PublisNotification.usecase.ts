import { UiNotificationOutput } from "../dto/NotificationOutput";
import { NotificationPolicy } from "../NotificationPolicy";
import { EmailNotificationSender } from "../ports/EmailNotificationSender";
import { UiNotificationPublisher } from "../ports/UiNotificationPublisher";

export class PublishNotificationUseCase {
  constructor(
    private uiPublisher: UiNotificationPublisher,
    private emailSender: EmailNotificationSender
  ) {}

  async execute(
    notification: UiNotificationOutput & { recipientEmail?: string }
  ): Promise<{ uiSent: boolean; emailSent: boolean }> {
    const channels = NotificationPolicy.resolveChannels(notification.type);
    let uiSent = false;
    let emailSent = false;

    for (const channel of channels) {
      if (channel === "UI") {
        await this.uiPublisher.publisher(notification);
        uiSent = true;
      } else if (channel === "EMAIL" && notification.recipientEmail) {
        await this.emailSender.send({
          to: notification.recipientEmail,
          subject: notification.title,
          template: "default-template",
          variables: notification.payload || {},
          priority: "MEDIUM",
        });
        emailSent = true;
      }
    }

    return { uiSent, emailSent };
  }
}
