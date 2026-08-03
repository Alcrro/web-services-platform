export type NotificationChannelType =
  (typeof notificationChannel)[keyof typeof notificationChannel];
export const notificationChannel = {
  UI: "UI",
  EMAIL: "EMAIL",
  WEBSOCKET: "WEBSOCKET",
} as const;
