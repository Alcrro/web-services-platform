import style from "@/components/styles/header.module.scss";
import ToggleButton from "../atoms/buttons/ToggleNavbarMenuButton";
import ThemeToggle from "../atoms/buttons/ThemeToggle";
import CompanyLogo from "../atoms/company/CompanyLogo";
import NavbarMenu from "../molecules/header/navbar/NavbarMenu";
import NavModal from "../molecules/NavModal";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

export default function PublicHeader() {
  return (
    <header className={style.header}>
      <NavModal>
        <CompanyLogo>ALCRRO</CompanyLogo>
        <div className="flex items-center max-sm:ml-0 max-sm:mx-0 ml-auto mx-2 gap-1">
          <Link
            href="/administrator/control-panel"
            title="Admin Dashboard"
            className="p-2 rounded-lg text-(--color-text-secondary) hover:text-(--color-accent) hover:bg-(--color-accent)/10 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
          </Link>
          <ThemeToggle />
          <ToggleButton />
        </div>
        <NavbarMenu />
      </NavModal>
    </header>
  );
}
