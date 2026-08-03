"use client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { AuthAPI } from "@/modules/auth/infrastructure/auth.api";

const AdminSidebarLogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const api = new AuthAPI();
      await api.logout();
    } finally {
      router.push("/auth/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-(--color-text-secondary) hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
    >
      <LogOut className="w-4 h-4" />
      <span>Logout</span>
    </button>
  );
};

export default AdminSidebarLogoutButton;
