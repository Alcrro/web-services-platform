import { ApplicationStatus } from "../../domain/application.types";

const statusConfig: Record<ApplicationStatus, { label: string; cls: string }> = {
  [ApplicationStatus.APPLIED]: {
    label: "Applied",
    cls: "bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400",
  },
  [ApplicationStatus.INTERVIEW]: {
    label: "Interview",
    cls: "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400",
  },
  [ApplicationStatus.WON]: {
    label: "Won",
    cls: "bg-green-50 text-green-700 dark:bg-green-400/10 dark:text-green-400",
  },
  [ApplicationStatus.LOST]: {
    label: "Lost",
    cls: "bg-red-50 text-red-700 dark:bg-red-400/10 dark:text-red-400",
  },
  [ApplicationStatus.NO_RESPONSE]: {
    label: "No response",
    cls: "bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-white/50",
  },
};

export default function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
  const { label, cls } = statusConfig[status] ?? statusConfig[ApplicationStatus.APPLIED];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${cls}`}>
      {label}
    </span>
  );
}
