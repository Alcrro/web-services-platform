import FooterIconLink from "@/components/atoms/footer/FooterIconLink";
import {
  iconsMap,
  IFooterChildren,
} from "@/shared/data/consts/footer/footerData";
import { FC } from "react";
import { IconType } from "react-icons/lib";

interface IFooterChildrenProps {
  items: IFooterChildren[];
}

const FooterSocials: FC<IFooterChildrenProps> = ({ items }) => {
  return (
    <div className="flex gap-3 justify-center">
      {items.map((item) => {
        const Icon = iconsMap[item.name] as IconType;
        if (!Icon) return null;
        const isDisabled = item.name === "microsoft-teams";
        return (
          <FooterIconLink
            key={item.id}
            name={item.name}
            Icon={Icon}
            link={item.link}
            disabled={isDisabled}
          />
        );
      })}
    </div>
  );
};

export default FooterSocials;
