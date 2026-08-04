import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { MessageSquare, ArrowRight, Check, Clock } from "lucide-react";

const AllOrderDiscussions = async () => {
  const orders = await prisma.serviceOrder.findMany({
    where: { isDeleted: false },
    orderBy: { createdAt: "desc" },
    include: {
      discussions: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { status: true, createdAt: true, notes: true },
      },
      _count: { select: { discussions: true } },
      client: { select: { name: true } },
    },
  });

  const cardCls = "rounded-xl border border-(--color-border) dark:border-white/10 bg-(--color-bg-section) dark:bg-slate-700/50 shadow-[0_2px_12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.05)]";

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-bold text-(--color-text)">Discussions</h2>
        <p className="text-sm text-(--color-text-secondary) mt-0.5">All orders with discussion history</p>
      </div>

      {orders.length === 0 && (
        <div className={`${cardCls} p-8 flex flex-col items-center gap-3 text-center`}>
          <MessageSquare className="w-8 h-8 text-(--color-text-secondary)" />
          <p className="text-sm text-(--color-text-secondary)">No orders yet.</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {orders.map((order) => {
          const count = order._count.discussions;
          const latest = order.discussions[0];

          return (
            <Link
              key={order.id}
              href={`/administrator/control-panel/orders/discussions/id/${order.id}`}
              className={`${cardCls} p-4 flex items-center justify-between gap-4 hover:bg-(--color-bg-hover) transition-colors group`}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-(--color-accent)/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-(--color-accent)" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-(--color-text) truncate">{order.projectName ?? "Untitled order"}</p>
                  <p className="text-xs text-(--color-text-secondary) mt-0.5">{order.client.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                {count === 0 ? (
                  <span className="text-xs text-(--color-text-secondary)">No discussions</span>
                ) : (
                  <div className="flex flex-col items-end gap-0.5">
                    <div className="flex items-center gap-1.5">
                      {latest?.status === "CONFIRMED" ? (
                        <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
                          <Check className="w-3 h-3" /> Confirmed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500">
                          <Clock className="w-3 h-3" /> Draft
                        </span>
                      )}
                      <span className="text-xs text-(--color-text-secondary)">{count} session{count !== 1 ? "s" : ""}</span>
                    </div>
                    {latest && (
                      <p className="text-xs text-(--color-text-secondary)">
                        {new Date(latest.createdAt).toLocaleDateString("ro-RO")}
                      </p>
                    )}
                  </div>
                )}
                <ArrowRight className="w-4 h-4 text-(--color-text-secondary) group-hover:text-(--color-accent) transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AllOrderDiscussions;
