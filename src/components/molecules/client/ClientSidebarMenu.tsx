import { SidebarItem } from "./ClientSidebarListItem";
import { sidebarSections } from "@/shared/data/consts/clientDashboard/sidebarSectionsData";

const ClientSidebarMenu = () => {
  return (
    <>
      {sidebarSections.map((item) => (
        <SidebarItem key={item.title} item={item} />
      ))}
    </>
  );
};

export default ClientSidebarMenu;
