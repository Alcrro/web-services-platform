import ClientSidebarMenu from "../molecules/client/ClientSidebarMenu";
import AdminSidebarLogoutButton from "@/components/atoms/buttons/AdminSidebarLogoutButton";
import ClientProfileHeader from "./client/ClientProfileHeader";

const ClientSidebar = () => {
  return (
    <aside className="w-55 max-lg:w-full shrink-0 bg-(--color-bg-section) rounded-xl flex flex-col max-lg:flex-row max-lg:items-center max-lg:overflow-x-auto lg:sticky lg:top-4">
      {/* Profile */}
      <ClientProfileHeader />

      {/* Nav */}
      <div className="flex-1 p-2 flex flex-col gap-0.5 max-lg:flex-row max-lg:items-center max-lg:gap-1">
        <p className="text-[10px] font-semibold text-(--color-text-secondary) uppercase tracking-widest px-3 py-2 max-lg:hidden">
          Navigation
        </p>
        <ClientSidebarMenu />
      </div>

      {/* Bottom */}
      <div className="p-2 border-t border-(--color-border) max-lg:border-t-0 max-lg:border-l">
        <AdminSidebarLogoutButton />
      </div>
    </aside>
  );
};

export default ClientSidebar;
