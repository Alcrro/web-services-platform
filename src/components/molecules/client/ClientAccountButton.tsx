"use client";
import { useState, useRef, useEffect } from "react";
import { Settings, X, Camera, Loader2, Check, Mail, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
}

async function compressImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const MAX = 200;
      let { width, height } = img;
      if (width > MAX || height > MAX) {
        const r = Math.min(MAX / width, MAX / height);
        width = Math.round(width * r);
        height = Math.round(height * r);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
      let q = 0.85;
      let b64 = canvas.toDataURL("image/jpeg", q);
      while (b64.length > 150_000 && q > 0.2) {
        q -= 0.1;
        b64 = canvas.toDataURL("image/jpeg", q);
      }
      resolve(b64);
    };
    img.src = url;
  });
}

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function ClientAccountButton({ name, email, phone, avatar }: Props) {
  const [open, setOpen] = useState(false);
  const [editName, setEditName] = useState(name);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(avatar);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) {
      setEditName(name);
      setAvatarPreview(avatar);
    }
  }, [open, name, avatar]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImage(file);
    setAvatarPreview(compressed);
    e.target.value = "";
  };

  const handleSave = async () => {
    if (!editName.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/client/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName.trim(),
          avatar: avatarPreview,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Profile updated.");
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const initials = getInitials(editName || name);
  const isDirty = editName.trim() !== name || avatarPreview !== avatar;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-(--color-text-secondary) hover:text-(--color-text) hover:bg-(--color-bg-hover) transition-colors w-full justify-center"
      >
        <Settings className="w-3.5 h-3.5" />
        Account details
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative w-full max-w-sm rounded-2xl border border-(--color-border) dark:border-white/10 bg-(--color-bg-section) dark:bg-slate-800 shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-(--color-border) dark:border-white/10">
              <p className="text-sm font-semibold text-(--color-text)">Account details</p>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg text-(--color-text-secondary) hover:text-(--color-text) hover:bg-(--color-bg-hover) transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-5 py-5 flex flex-col gap-5">
              {/* Avatar upload */}
              <div className="flex flex-col items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="relative group w-20 h-20 rounded-full overflow-hidden ring-2 ring-(--color-accent)/30 hover:ring-(--color-accent)/60 transition-all shadow-md"
                >
                  {avatarPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-(--color-accent) flex items-center justify-center">
                      <span className="text-2xl font-bold text-white tracking-wide select-none">
                        {initials}
                      </span>
                    </div>
                  )}
                  {/* Camera overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </button>
                <p className="text-[11px] text-(--color-text-secondary)">
                  Click to change photo
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3 h-3" /> Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-(--color-border) dark:border-white/10 bg-(--color-bg) text-sm text-(--color-text) focus:outline-none focus:ring-2 focus:ring-(--color-accent)/30 focus:border-(--color-accent) transition-colors"
                />
              </div>

              {/* Email — read only */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3 h-3" /> Email
                </label>
                <p className="px-3 py-2 rounded-lg bg-(--color-bg-hover) text-sm text-(--color-text-secondary) truncate">
                  {email}
                </p>
              </div>

              {/* Phone — read only */}
              {phone && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-(--color-text-secondary) uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3 h-3" /> Phone
                  </label>
                  <p className="px-3 py-2 rounded-lg bg-(--color-bg-hover) text-sm text-(--color-text-secondary)">
                    {phone}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 pb-5">
              <button
                onClick={handleSave}
                disabled={saving || !isDirty || !editName.trim()}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-(--color-accent) text-white text-sm font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
