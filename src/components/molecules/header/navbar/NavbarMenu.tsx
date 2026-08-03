import { navbarMenuData } from "@/shared/data/consts/header/menu";
import NavbarMenuModal from "./NavbarMenuModal";
import NavbarMenuItem from "./NavbarMenuItem";

const NavbarMenu = () => {
  return (
    <NavbarMenuModal>
      {navbarMenuData.map((menu) => (
        <NavbarMenuItem menu={menu} key={menu.id} />
      ))}
    </NavbarMenuModal>
  );
};

export default NavbarMenu;
