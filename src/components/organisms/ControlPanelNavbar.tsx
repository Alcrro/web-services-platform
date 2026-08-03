import { Search, Home } from "lucide-react";
import ThemeToggle from "@/components/atoms/buttons/ThemeToggle";
import SearchBar from "@/components/molecules/SearchBar";
import AdminBreadcrumb from "@/components/molecules/AdminBreadcrumb";
import AdminNavProfile from "@/components/molecules/AdminNavProfile";
import Link from "next/link";

const ControlPanelNavbar = () => {
  return (
    <div className="flex items-center justify-between px-5 py-3 bg-(--color-bg-section) rounded-xl">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-(--color-text-secondary) hover:text-(--color-text) transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <span className="text-(--color-border)">·</span>
        <AdminBreadcrumb />
      </div>

      <div className="flex items-center gap-1">
        <SearchBar type="search" label="Search" icon={Search} />
        <ThemeToggle />
        <AdminNavProfile />
      </div>
    </div>
  );
};

export default ControlPanelNavbar;
