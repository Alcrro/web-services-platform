"use client";
import { useState } from "react";
import { X, Loader2, CheckCircle2 } from "lucide-react";

interface Props {
  serviceName: string;
  serviceSlug: string;
  onClose: () => void;
}

const ServiceInquiryModal = ({ serviceName, serviceSlug, onClose }: Props) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/public/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, serviceSlug }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong");
      }

      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-(--color-bg) rounded-2xl border border-(--color-border) shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 border-b border-(--color-border)">
          <div>
            <h2 className="text-lg font-bold text-(--color-text)">Get started</h2>
            <p className="text-sm text-(--color-text-secondary) mt-0.5">
              {serviceName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-(--color-text-secondary) hover:text-(--color-text) transition-colors mt-0.5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <p className="text-base font-semibold text-(--color-text)">Request sent!</p>
              <p className="text-sm text-(--color-text-secondary)">
                We&apos;ll review your inquiry and get back to you soon.
              </p>
              <button
                onClick={onClose}
                className="mt-2 text-sm font-medium text-(--color-accent) hover:underline"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-(--color-text-secondary)">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Alex Popescu"
                    className="px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-bg-section) text-sm text-(--color-text) placeholder:text-(--color-text-secondary) focus:outline-none focus:ring-2 focus:ring-(--color-accent)/30 focus:border-(--color-accent)"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-(--color-text-secondary)">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+40 700 000 000"
                    className="px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-bg-section) text-sm text-(--color-text) placeholder:text-(--color-text-secondary) focus:outline-none focus:ring-2 focus:ring-(--color-accent)/30 focus:border-(--color-accent)"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-(--color-text-secondary)">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="alex@company.com"
                  className="px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-bg-section) text-sm text-(--color-text) placeholder:text-(--color-text-secondary) focus:outline-none focus:ring-2 focus:ring-(--color-accent)/30 focus:border-(--color-accent)"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-(--color-text-secondary)">
                  Tell us what you need <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  minLength={10}
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Describe your project, timeline, specific requirements..."
                  className="px-3 py-2 rounded-lg border border-(--color-border) bg-(--color-bg-section) text-sm text-(--color-text) placeholder:text-(--color-text-secondary) focus:outline-none focus:ring-2 focus:ring-(--color-accent)/30 focus:border-(--color-accent) resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-500">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-(--color-accent) text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === "loading" ? "Sending..." : "Send request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceInquiryModal;
