export type NotificationType =
  (typeof notificationType)[keyof typeof notificationType];
export const notificationType = {
  ORDER_ACCOUNT_LINK_REMINDER: "ORDER_ACCOUNT_LINK_REMINDER",
  ORDER_ACCOUNT_LINKED: "ORDER_ACCOUNT_LINKED",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
} as const;
