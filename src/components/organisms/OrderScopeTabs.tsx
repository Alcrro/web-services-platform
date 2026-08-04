"use client";
import Link from "next/link";
import { ArrowUpRight, MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation";

interface Props {
  orderId: string;
  active: "extend" | "discussions";
}

const tabs = [
  { value: "extend", label: "Extend", icon: ArrowUpRight },
  { value: "discussions", label: "Discussions", icon: MessageSquare },
] as const;

export default function OrderScopeTabs({ orderId }: Props) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-0 border-b border-(--color-border)">
      {tabs.map(({ value, label, icon: Icon }) => {
        const href = `/administrator/control-panel/orders/${value}/id/${orderId}`;
        const isActive = pathname.startsWith(`/administrator/control-panel/orders/${value}`);

        return (
          <Link
            key={value}
            href={href}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              isActive
                ? "text-(--color-accent) border-(--color-accent)"
                : "text-(--color-text-secondary) border-transparent hover:text-(--color-text) hover:border-(--color-border)"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
