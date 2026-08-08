"use client";

import { Inbox } from "lucide-react";
import { toast } from "react-toastify";
import { IApplication, ApplicationStatus } from "../../domain/application.types";
import { useApplications, useUpdateApplicationStatus } from "../../hooks/prospecting.hooks";
import ApplicationStatusBadge from "./ApplicationStatusBadge";

const STATUS_OPTIONS = [
  ApplicationStatus.APPLIED,
  ApplicationStatus.INTERVIEW,
  ApplicationStatus.WON,
  ApplicationStatus.LOST,
  ApplicationStatus.NO_RESPONSE,
];

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  [ApplicationStatus.APPLIED]: "Applied",
  [ApplicationStatus.INTERVIEW]: "Interview",
  [ApplicationStatus.WON]: "Won",
  [ApplicationStatus.LOST]: "Lost",
  [ApplicationStatus.NO_RESPONSE]: "No response",
};

const thCls = "text-left text-xs font-semibold text-(--color-text-secondary) px-4 py-3 whitespace-nowrap";
const tdCls = "px-4 py-3 text-sm text-(--color-text) align-middle";

function SkeletonRow() {
  return (
    <tr className="border-t border-gray-100 dark:border-white/10">
      {Array.from({ length: 6 }).map((_, i) => (
        <td key={i} className={tdCls}>
          <div className="h-4 rounded bg-gray-200 dark:bg-white/10 animate-pulse w-24" />
        </td>
      ))}
    </tr>
  );
}

function StatusDropdown({ row }: { row: IApplication }) {
  const { mutate: updateStatus, isPending } = useUpdateApplicationStatus();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as ApplicationStatus;
    updateStatus(
      { id: row.id!, status: newStatus },
      {
        onSuccess: () => toast.success("Status actualizat."),
        onError: () => toast.error("Eroare la actualizare."),
      }
    );
  };

  return (
    <select
      value={row.status}
      onChange={handleChange}
      disabled={isPending}
      className="text-xs px-2 py-1.5 rounded-lg border bg-white border-gray-200 text-(--color-text) focus:outline-none focus:border-gray-400 dark:bg-white/5 dark:border-white/10 dark:focus:border-white/30 disabled:opacity-50 transition-colors cursor-pointer"
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}

function formatDate(date?: Date) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("ro-RO", { day: "2-digit", month: "short", year: "numeric" });
}

function formatBudget(row: IApplication) {
  if (!row.budget) return "—";
  return `${row.budget} ${row.currency}`;
}

export default function ApplicationsTable() {
  const { data, isLoading } = useApplications();
  const applications: IApplication[] = data?.data ?? [];

  const cardCls =
    "rounded-xl border bg-gray-50 border-gray-200 dark:bg-white/5 dark:border-white/10 overflow-hidden";

  return (
    <div className={cardCls}>
      <div className="px-4 py-3 border-b border-gray-100 dark:border-white/10">
        <h3 className="text-sm font-semibold text-(--color-text)">Aplicații salvate</h3>
        {!isLoading && (
          <p className="text-xs text-(--color-text-secondary) mt-0.5">
            {data?.total ?? 0} {data?.total === 1 ? "aplicație" : "aplicații"}
          </p>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100/60 dark:bg-white/[0.03]">
            <tr>
              <th className={thCls}>Platformă</th>
              <th className={thCls}>Proiect</th>
              <th className={thCls}>Client</th>
              <th className={thCls}>Buget</th>
              <th className={thCls}>Status</th>
              <th className={thCls}>Data aplicării</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)
              : applications.length === 0
              ? (
                <tr>
                  <td colSpan={6}>
                    <div className="flex flex-col items-center gap-2 py-10 text-center">
                      <Inbox className="w-7 h-7 text-gray-400 dark:text-white/30" />
                      <p className="text-sm text-(--color-text-secondary)">
                        Nicio aplicație salvată încă.
                      </p>
                    </div>
                  </td>
                </tr>
              )
              : applications.map((app) => (
                <tr
                  key={app.id}
                  className="border-t border-gray-100 dark:border-white/10 hover:bg-gray-100/60 dark:hover:bg-white/[0.03] transition-colors"
                >
                  <td className={tdCls}>
                    <span className="font-medium">{app.platform}</span>
                  </td>
                  <td className={tdCls}>
                    <span className="max-w-[180px] truncate block">{app.projectName}</span>
                  </td>
                  <td className={`${tdCls} text-(--color-text-secondary)`}>
                    {app.clientName ?? "—"}
                  </td>
                  <td className={`${tdCls} tabular-nums`}>{formatBudget(app)}</td>
                  <td className={tdCls}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <ApplicationStatusBadge status={app.status} />
                      <StatusDropdown row={app} />
                    </div>
                  </td>
                  <td className={`${tdCls} text-(--color-text-secondary) tabular-nums`}>
                    {formatDate(app.appliedAt)}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
