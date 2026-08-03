// notifications/application/dto/EmailNotificationMessage.ts
export interface EmailNotificationMessage {
  to: string; // destinatar
  subject: string; // subject email
  template: string; // template key (ex: "login-new-device")
  variables: Record<string, unknown>; // date pt template
  priority?: NotificationPriorityLevel;
}

export type NotificationPriorityLevel =
  (typeof notificationPriority)[keyof typeof notificationPriority];
export const notificationPriority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
};
