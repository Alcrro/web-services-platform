"use client";
import { usePathname } from "next/navigation";

const AdminBreadcrumb = () => {
  const pathname = usePathname();
  const crumbs =
    pathname.split("/control-panel/")[1]?.split("/").filter(Boolean) ?? [];

  return (
    <nav className="flex items-center gap-1.5 text-sm">
      <span className="text-(--color-text-secondary) font-medium">
        Control Panel
      </span>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="text-(--color-border)">/</span>
          <span
            className={`capitalize ${
              i === crumbs.length - 1
                ? "text-(--color-text) font-semibold"
                : "text-(--color-text-secondary)"
            }`}
          >
            {crumb}
          </span>
        </span>
      ))}
    </nav>
  );
};

export default AdminBreadcrumb;
