import type { IServiceOrderStatus } from "@/modules/orders/domain/types/order.types";

const statusConfig: Record<
  IServiceOrderStatus,
  { label: string; className: string }
> = {
  PENDING_REVIEW: {
    label: "Pending Review",
    className: "bg-purple-50 text-purple-700 dark:bg-purple-400/10 dark:text-purple-400",
  },
  NEW: {
    label: "New",
    className: "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-white/60",
  },
  IN_DISCUSSION: {
    label: "In Discussion",
    className: "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400",
  },
  APPROVED: {
    label: "Approved",
    className: "bg-green-50 text-green-700 dark:bg-green-400/10 dark:text-green-400",
  },
  DONE: {
    label: "Done",
    className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400",
  },
};

interface StatusBadgeProps {
  status: IServiceOrderStatus;
  size?: "sm" | "md";
}

const StatusBadge = ({ status, size = "md" }: StatusBadgeProps) => {
  const { label, className } = statusConfig[status] ?? statusConfig.NEW;
  const padding = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${padding} ${className}`}>
      {label}
    </span>
  );
};

export default StatusBadge;
