"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clientSectionTabsConfig } from "@/shared/data/consts/clientDashboard/clientSectionTabsConfig";

interface ClientSectionTabsProps {
  section: string;
}

const ClientSectionTabs = ({ section }: ClientSectionTabsProps) => {
  const pathname = usePathname();
  const tabs = clientSectionTabsConfig[section];

  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="flex items-center gap-0 border-b border-(--color-border)">
      {tabs.map((tab) => {
        const href = `/client/control-panel/${section}/${tab.value}`;
        const isActive = pathname === href || pathname.startsWith(href + "/");

        return (
          <Link
            key={tab.value}
            href={href}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              isActive
                ? "text-(--color-accent) border-(--color-accent)"
                : "text-(--color-text-secondary) border-transparent hover:text-(--color-text) hover:border-(--color-border)"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default ClientSectionTabs;
