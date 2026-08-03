import { SidebarItem } from "./ClientSidebarListItem";
import { sidebarSections } from "@/shared/data/consts/clientDashboard/sidebarSectionsData";

const ClientSidebarMenu = () => {
  return (
    <div className="flex gap-2 p-1 w-full bg-(--color-bg-section) rounded-xl h-fit min-[1000px]:flex-col min-[1000px]:max-w-2xs min-[1000px]:overflow-auto">
      {sidebarSections.map((item) => (
        <SidebarItem key={item.title} item={item} />
      ))}
    </div>
  );
};

export default ClientSidebarMenu;
