"use client";
import { Package, ShoppingCart, Settings, MessageCircle } from "lucide-react";
import style from "./ServicesStatCard.module.scss";

const iconMap = { Package, ShoppingCart, Settings, MessageCircle };
export type StatIconName = keyof typeof iconMap;
export type StatVariant = "indigo" | "emerald" | "blue" | "amber";

interface Props {
  label: string;
  value: number | string;
  sub: string;
  iconName: StatIconName;
  variant: StatVariant;
}

export default function ServicesStatCard({
  label,
  value,
  sub,
  iconName,
  variant,
}: Props) {
  const Icon = iconMap[iconName];

  return (
    <div className={`${style.card} ${style[variant]}`}>
      <div className="flex items-center justify-between">
        <div className={style.iconContainer}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-xs font-medium text-(--color-text-secondary) uppercase tracking-wider">
          {label}
        </span>
      </div>

      <div>
        <p className="text-3xl font-bold text-(--color-text) tracking-tight leading-none">
          {value}
        </p>
        <p className="text-xs text-(--color-text-secondary) mt-1.5">{sub}</p>
      </div>
    </div>
  );
}
