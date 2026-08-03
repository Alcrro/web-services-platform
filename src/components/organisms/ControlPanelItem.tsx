"use client";
import { usePathname } from "next/navigation";
import { Users, ClipboardList, Globe } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ControlPanelItemProps {
  name: string;
  href: string;
}

const sectionIcons: Record<string, React.ReactNode> = {
  clients: <Users className="w-4 h-4" />,
  orders: <ClipboardList className="w-4 h-4" />,
  services: <Globe className="w-4 h-4" />,
};

const ControlPanelItem = ({ name, href }: ControlPanelItemProps) => {
  const pathname = usePathname();
  const isActive = pathname.includes(`/control-panel/${name}`);

  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? "text-(--color-accent) bg-(--color-accent)/10"
          : "text-(--color-text-secondary) hover:text-(--color-text) hover:bg-(--color-bg-hover)"
      }`}
    >
      <span className={isActive ? "text-(--color-accent)" : ""}>
        {sectionIcons[name] ?? <span className="w-4 h-4 block" />}
      </span>
      <span className="capitalize">{name}</span>
    </Link>
  );
};

export default ControlPanelItem;
