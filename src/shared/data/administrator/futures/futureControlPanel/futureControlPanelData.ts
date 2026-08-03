export const futureControlPanelData = [
  {
    label: "statistics",
    href: "/administrator/control-panel",
  },
  {
    label: "add",
    href: "/administrator/control-panel",
  },
  { label: "view", href: "/administrator/control-panel" },
];
export const futureControlPanelOrders = [
  {
    label: "Statistics",
    href: "/administrator/control-panel/orders/statistics",
  },
  {
    label: "Add new client",
    href: "/administrator/control-panel/clients/new-client",
  },
  { label: "View all clients", href: "/administrator/control-panel/clients" },
];

export interface IFutureControlPanel {
  label: string;
  href: string;
}
