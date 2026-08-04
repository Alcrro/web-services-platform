import { futureDashboardData } from "@/shared/data/administrator/futures/futureDashboard/futureDashboardData";
import ControlPanel from "@/components/molecules/ControlPanel";
import AdminSidebarLogoutButton from "@/components/atoms/buttons/AdminSidebarLogoutButton";
import { LayoutDashboard } from "lucide-react";

const AdminSidebar = () => {
  return (
    <aside className="w-55 max-lg:w-full shrink-0 bg-(--color-bg-section) rounded-xl flex flex-col max-lg:flex-row max-lg:items-center max-lg:overflow-x-auto lg:sticky lg:top-4">
      {/* Brand */}
      <div className="px-4 py-4 border-b border-(--color-border) max-lg:border-b-0 max-lg:border-r max-lg:py-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-(--color-accent)/15 flex items-center justify-center shrink-0">
            <LayoutDashboard className="w-4 h-4 text-(--color-accent)" />
          </div>
          <div className="min-w-0 max-lg:hidden">
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
      <div className="flex-1 p-2 flex flex-col gap-0.5 max-lg:flex-row max-lg:items-center max-lg:gap-1">
        <p className="text-[10px] font-semibold text-(--color-text-secondary) uppercase tracking-widest px-3 py-2 max-lg:hidden">
          Navigation
        </p>
        {futureDashboardData.map((item) => (
          <ControlPanel item={item} key={item.name} />
        ))}
      </div>

      {/* Bottom */}
      <div className="p-2 border-t border-(--color-border) max-lg:border-t-0 max-lg:border-l">
        <AdminSidebarLogoutButton />
      </div>
    </aside>
  );
};

export default AdminSidebar;
