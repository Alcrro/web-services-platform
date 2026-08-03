import * as Icons from "lucide-react"; // import all icons as object
import type { LucideIcon } from "lucide-react";

const SidebarItemIcon = ({ iconName }: { iconName: string }) => {
  const LucideIcons = Icons as unknown as Record<string, LucideIcon>;
  const IconComponent = LucideIcons[iconName];
  if (!IconComponent) return null;
  return (
    <IconComponent
      size={20}
      className="mr-2 text-gray-500 dark:text-gray-300"
    />
  );
};
export default SidebarItemIcon;
