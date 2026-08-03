import { NotificationType } from "../types/NotificationType";

export type UiNotificationOutput = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  payload?: Record<string, unknown>;
  createdAt: Date;
  read: boolean;
};
