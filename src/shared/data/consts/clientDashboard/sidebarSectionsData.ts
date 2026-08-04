export interface ISidebarClientSection {
  title: string;
  icon?: string;
  path: string;
}

export const sidebarSections: ISidebarClientSection[] = [
  { title: "Dashboard", icon: "Home", path: "/dashboard" },
  { title: "Workspace", icon: "Briefcase", path: "/workspace/list" },
  { title: "Billing", icon: "CreditCard", path: "/billing/invoices" },
  { title: "Support", icon: "LifeBuoy", path: "/support/tickets" },
  { title: "Settings", icon: "Settings", path: "/settings/profile" },
];
