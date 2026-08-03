"use client";
import { User } from "lucide-react";

const AdminNavProfile = () => {
  return (
    <button
      type="button"
      className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-(--color-bg-hover) transition-colors cursor-pointer"
      aria-label="Profile"
    >
      <div className="w-7 h-7 rounded-full bg-(--color-accent)/15 flex items-center justify-center">
        <User className="w-3.5 h-3.5 text-(--color-accent)" />
      </div>
    </button>
  );
};

export default AdminNavProfile;
