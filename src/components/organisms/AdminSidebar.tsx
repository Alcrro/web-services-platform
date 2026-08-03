import { futureDashboardData } from "@/shared/data/administrator/futures/futureDashboard/futureDashboardData";
import ControlPanel from "@/components/molecules/ControlPanel";
import AdminSidebarLogoutButton from "@/components/atoms/buttons/AdminSidebarLogoutButton";
import { LayoutDashboard } from "lucide-react";

const AdminSidebar = () => {
  return (
    <aside className="w-55 shrink-0 bg-(--color-bg-section) rounded-xl flex flex-col sticky top-4">
      {/* Brand */}
      <div className="px-4 py-4 border-b border-(--color-border)">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-(--color-accent)/15 flex items-center justify-center shrink-0">
            <LayoutDashboard className="w-4 h-4 text-(--color-accent)" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-(--color-text) leading-none truncate">
              WebServices
            </p>
            <p className="text-[10px] text-(--color-accent) font-semibold mt-0.5 uppercase tracking-wider">
              Admin
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 p-2 flex flex-col gap-0.5">
        <p className="text-[10px] font-semibold text-(--color-text-secondary) uppercase tracking-widest px-3 py-2">
          Navigation
        </p>
        {futureDashboardData.map((item) => (
          <ControlPanel item={item} key={item.name} />
        ))}
      </div>

      {/* Bottom */}
      <div className="p-2 border-t border-(--color-border)">
        <AdminSidebarLogoutButton />
      </div>
    </aside>
  );
};

export default AdminSidebar;
