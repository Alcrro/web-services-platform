export interface ISidebarClientSection {
  title: string;
  icon?: string;
  path?: string;
  children?: ISidebarClientChildren[];
}

export interface ISidebarClientChildren {
  title: string;
  path: string;
  icon?: string;
}

export const sidebarSections: ISidebarClientSection[] = [
  {
    title: "Dashboard",
    icon: "Home",
    path: "/dashboard",
  },
  {
    title: "Services",
    icon: "FileText",
    children: [
      { title: "My Orders", path: "/services/orders" },
      { title: "Create New Order", path: "/services/create" },
      { title: "Service Catalog", path: "/services/catalog" },
    ],
  },
  {
    title: "Projects",
    icon: "ClipboardList",
    children: [
      { title: "Active Projects", path: "/projects/active" },
      { title: "Tasks / Issues", path: "/projects/tasks" },
      { title: "Milestones", path: "/projects/milestones" },
    ],
  },
  {
    title: "Team",
    icon: "Users",
    children: [
      { title: "Developers", path: "/team/devs" },
      { title: "Clients", path: "/team/clients" },
    ],
  },
  {
    title: "Billing",
    icon: "CreditCard",
    children: [
      { title: "Invoices", path: "/billing/invoices" },
      { title: "Payments", path: "/billing/payments" },
    ],
  },
  {
    title: "Support",
    icon: "LifeBuoy",
    children: [
      { title: "Tickets", path: "/support/tickets" },
      { title: "FAQs / Docs", path: "/support/faqs" },
    ],
  },
  {
    title: "Settings",
    icon: "Settings",
    children: [
      { title: "Profile", path: "/settings/profile" },
      { title: "Notifications", path: "/settings/notifications" },
      { title: "Integrations", path: "/settings/integrations" },
      { title: "GitHub Connect", path: "/settings/github", icon: "Github" }, // optional nested icon
    ],
  },
] as const;
