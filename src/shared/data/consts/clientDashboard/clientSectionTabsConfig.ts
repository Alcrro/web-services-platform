import {
  FileText,
  CreditCard,
  HelpCircle,
  BookOpen,
  User,
  Bell,
  Puzzle,
  Github,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

interface TabConfig {
  label: string;
  value: string;
  icon: LucideIcon;
}

export const clientSectionTabsConfig: Record<string, TabConfig[]> = {
  workspace: [
    { label: "My Projects", value: "list", icon: Briefcase },
  ],
  billing: [
    { label: "Invoices", value: "invoices", icon: FileText },
    { label: "Payments", value: "payments", icon: CreditCard },
  ],
  support: [
    { label: "Tickets", value: "tickets", icon: HelpCircle },
    { label: "FAQs / Docs", value: "faqs", icon: BookOpen },
  ],
  settings: [
    { label: "Profile", value: "profile", icon: User },
    { label: "Notifications", value: "notifications", icon: Bell },
    { label: "Integrations", value: "integrations", icon: Puzzle },
    { label: "GitHub Connect", value: "github", icon: Github },
  ],
};
