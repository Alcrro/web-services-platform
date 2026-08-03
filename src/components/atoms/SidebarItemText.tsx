import Description from "@/shared/ui/Description";

interface SidebarItemTextProps {
  title: string;
}

export const SidebarItemText = ({ title }: SidebarItemTextProps) => (
  <Description
    as="span"
    className="ml-2 text-gray-700 dark:text-gray-200 font-medium truncate"
  >
    {title}
  </Description>
);
