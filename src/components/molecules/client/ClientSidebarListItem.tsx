"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { usePathname } from "next/navigation";
import { ISidebarClientSection } from "@/shared/data/consts/clientDashboard/sidebarSectionsData";

const SidebarItemIcon = ({ iconName }: { iconName: string }) => {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[iconName];
  if (!Icon) return <span className="w-4 h-4 block" />;
  return <Icon className="w-4 h-4" />;
};

interface SidebarItemProps {
  item: ISidebarClientSection;
}

export const SidebarItem = ({ item }: SidebarItemProps) => {
  const pathname = usePathname();
  const sectionSlug = item.path.split("/")[1];
  const isActive = pathname.split("/")[3] === sectionSlug;

  return (
    <Link
      href={`/client/control-panel${item.path}`}
      className={`w-full max-lg:w-auto flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? "text-(--color-accent) bg-(--color-accent)/10"
          : "text-(--color-text-secondary) hover:text-(--color-text) hover:bg-(--color-bg-hover)"
      }`}
    >
      <span className={isActive ? "text-(--color-accent)" : ""}>
        {item.icon && <SidebarItemIcon iconName={item.icon} />}
      </span>
      <span>{item.title}</span>
    </Link>
  );
};
