import { FC } from "react";
import FooterTitle from "../../atoms/footer/FooterTitle";
import FooterLink from "../../atoms/footer/FooterLink";
import { IFooterData } from "@/shared/data/consts/footer/footerData";

interface FooterColumnProps {
  item: IFooterData;
}

const FooterColumn: FC<FooterColumnProps> = ({ item }) => (
  <div className="flex flex-col items-center">
    <FooterTitle title={item.title} />
    <div className="flex flex-col gap-2">
      {item.children.map((child) => (
        <FooterLink key={child.id} name={child.name} link={child.link} />
      ))}
    </div>
  </div>
);

export default FooterColumn;
