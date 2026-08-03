import { INavbarMenu } from "@/shared/data/consts/header/menu";
import { FC } from "react";
import NavLink from "../../../atoms/NavLink";

interface INavMenuItemProps {
  menu: INavbarMenu;
}
const NavbarMenuItem: FC<INavMenuItemProps> = ({ menu }) => {
  return (
    <li key={menu.id}>
      <NavLink href={menu.link} label={menu.name} />
    </li>
  );
};

export default NavbarMenuItem;
