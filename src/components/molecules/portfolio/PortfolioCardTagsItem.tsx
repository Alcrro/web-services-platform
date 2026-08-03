import { IconMapper } from "@/shared/data/consts/portfololioPage/iconMapper";
import { PortfolioTag } from "@/shared/data/consts/portfololioPage/portfolioPageContent";

const PortfolioTagsItem = ({ tag }: { tag: PortfolioTag }) => {
  const icon = Array.isArray(tag.value)
    ? IconMapper[tag.value[0]]
    : IconMapper[tag.value];

  return (
    <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-(--color-bg) border border-(--color-border) text-(--color-text-secondary)">
      {icon && <span className="flex items-center [&_svg]:w-3.5 [&_svg]:h-3.5">{icon}</span>}
      <span className="font-medium capitalize">{tag.type}</span>
    </div>
  );
};

export default PortfolioTagsItem;
