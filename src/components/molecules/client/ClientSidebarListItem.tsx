"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SidebarItemText } from "../../atoms/SidebarItemText";
import * as Icons from "lucide-react";
import useCloseDiv from "@/shared/utils/useCloseDiv";
import { ISidebarClientSection } from "@/shared/data/consts/clientDashboard/sidebarSectionsData";

interface SidebarItemIconProps {
  iconName: string;
}
const SidebarItemIcon = ({ iconName }: SidebarItemIconProps) => {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[iconName];
  if (!Icon) return null;
  return <Icon size={20} className="mr-2 text-gray-500 dark:text-gray-300" />;
};

interface SidebarItemProps {
  item: ISidebarClientSection;
}

export const SidebarItem = ({ item }: SidebarItemProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasChildren = !!item.children && item.children.length > 0;

  useCloseDiv({ ref, state: open, setState: setOpen });

  return (
    <div className="flex flex-col gap-2 bg-(--color-bg) rounded-xl">
      <div className="w-full">
        {/* Top-level row */}
        <div
          ref={ref}
          onClick={() => hasChildren && setOpen(!open)}
          className={`list relative flex items-center p-2 cursor-pointer rounded-md transition-all duration-200 
    ${
      open
        ? "bg-gray-200/70 dark:bg-gray-700/60 shadow-inner rounded-b-none"
        : "hover:bg-gray-200 dark:hover:bg-gray-700"
    }`}
        >
          {item.icon && <SidebarItemIcon iconName={item.icon} />}

          {item.path ? (
            <Link
              href={`/client/control-panel/${item.path}`}
              className="flex-1"
            >
              <SidebarItemText title={item.title} />
            </Link>
          ) : (
            <SidebarItemText title={item.title} />
          )}

          {hasChildren && (
            <span className="ml-auto">
              {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}

          {/* Submenu */}
          {hasChildren && open && (
            <div className="flex flex-col gap-2 absolute top-full left-1/2 -translate-x-1/2 z-10 min-[1000px]:max-w-2xs min-[1000px]:w-full bg-(--color-bg-section) border rounded-t-none rounded-xl shadow ">
              {item.children &&
                item.children.map((child) => (
                  <SidebarItem key={child.title} item={child} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
