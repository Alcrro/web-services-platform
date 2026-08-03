import { IFooterChildren } from "@/shared/data/consts/footer/footerData";
import { FC } from "react";

interface IFooterChildrenProps {
  items: IFooterChildren[];
}
const FooterContact: FC<IFooterChildrenProps> = ({ items }) => {
  return (
    <div className="flex flex-col text-center gap-1">
      {items.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>: <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default FooterContact;
