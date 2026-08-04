import { MessageSquare, CheckCircle2, Clock, FileEdit } from "lucide-react";
import { prisma } from "@/lib/prisma";

interface Props {
  orderId: string;
}

const WorkspaceDiscussionsTab = async ({ orderId }: Props) => {
  const discussions = await prisma.orderDiscussion.findMany({
    where: { orderId },
    select: {
      id: true,
      status: true,
      summary: true,
      notes: true,
      createdAt: true,
      items: {
        where: { isDeleted: false },
        select: { id: true, name: true, description: true, type: true },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (discussions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-(--color-text-secondary)">
        <MessageSquare className="w-8 h-8 opacity-30" />
        <p className="text-sm">No discussions yet.</p>
        <p className="text-xs opacity-60">Discussions will appear here as your project progresses.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider">
        Discussions
      </p>

      {discussions.map((d) => {
        const isConfirmed = d.status === "CONFIRMED";
        const plainNotes = d.notes
          ? d.notes.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
          : "";
        const displayText = d.summary || plainNotes || null;

        return (
        <div
          key={d.id}
          className="flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-4"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-(--color-text-secondary)">
              {isConfirmed ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">Confirmed</span>
                </>
              ) : (
                <>
                  <FileEdit className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="font-medium text-amber-600 dark:text-amber-400">In progress</span>
                </>
              )}
              <span className="opacity-40">·</span>
              <Clock className="w-3 h-3 shrink-0" />
              <span>
                {new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(new Date(d.createdAt))}
              </span>
            </div>
          </div>

          {/* Content */}
          {displayText ? (
            <p className="text-sm text-(--color-text) leading-relaxed">{displayText}</p>
          ) : (
            <p className="text-xs text-(--color-text-secondary) italic">
              This discussion is being prepared by your account manager.
            </p>
          )}

          {/* Items agreed in this discussion */}
          {d.items.length > 0 && (
            <div className="flex flex-col gap-1.5 pt-1">
              <p className="text-[11px] font-semibold text-(--color-text-secondary) uppercase tracking-wider">
                {isConfirmed ? "Items agreed" : "Items discussed"}
              </p>
              <div className="flex flex-col divide-y divide-gray-100 dark:divide-white/5 rounded-lg border border-gray-200 dark:border-white/10 overflow-hidden">
                {d.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-0.5 px-3 py-2 bg-white dark:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-(--color-text) font-medium">{item.name}</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-white/50 uppercase shrink-0">
                        {item.type.toLowerCase()}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-xs text-(--color-text-secondary) leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        );
      })}
    </div>
  );
};

export default WorkspaceDiscussionsTab;
