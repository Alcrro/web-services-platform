"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, X, Send } from "lucide-react";
import { API_URL } from "@/shared/config/env";
import type { IWorkspaceTaskComment } from "@/modules/orders/domain/types/workspace.types";

interface WorkspaceTaskFeedbackProps {
  orderId: string;
  taskId: string;
  comments: IWorkspaceTaskComment[];
}

const WorkspaceTaskFeedback = ({
  orderId,
  taskId,
  comments,
}: WorkspaceTaskFeedbackProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_URL}/api/client/workspace/${orderId}/tasks/${taskId}/feedback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: message.trim() }),
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to send feedback");
      setMessage("");
      setOpen(false);
      router.refresh();
    } catch {
      setError("Could not send feedback. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      {comments.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {comments.map((c) => (
            <div
              key={c.id}
              className="px-3 py-2 rounded-lg text-xs text-(--color-text-secondary) bg-gray-100 border border-gray-200 dark:bg-white/5 dark:border-white/10"
            >
              <span className="font-medium text-(--color-text)">Your feedback: </span>
              {c.message}
            </div>
          ))}
        </div>
      )}

      {open ? (
        <div className="flex flex-col gap-2">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your feedback..."
            rows={3}
            className="w-full text-xs rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-(--color-text) placeholder:text-(--color-text-secondary) px-3 py-2 resize-none focus:outline-none focus:border-(--color-accent)"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSubmit}
              disabled={loading || !message.trim()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-(--color-accent) text-white hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              <Send className="w-3 h-3" />
              {loading ? "Sending..." : "Send"}
            </button>
            <button
              onClick={() => { setOpen(false); setMessage(""); setError(null); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
            >
              <X className="w-3 h-3" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 text-xs text-(--color-text-secondary) hover:text-(--color-accent) transition-colors w-fit"
        >
          <MessageSquare className="w-3 h-3" />
          {comments.length > 0 ? "Add another feedback" : "Add feedback"}
        </button>
      )}
    </div>
  );
};

export default WorkspaceTaskFeedback;
