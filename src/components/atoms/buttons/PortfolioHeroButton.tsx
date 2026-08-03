import { FC } from "react";
import Button from "../../../shared/ui/Button";

interface IPortfolioHeroProps {
  cta: {
    href: string;
    text: string;
  };
}

const PortfolioHeroButton: FC<IPortfolioHeroProps> = ({ cta }) => {
  return (
    <Button
      href={cta.href}
      variant="primary"
      className="w-fit mx-auto px-8 py-3 text-base rounded-xl font-semibold shadow-lg shadow-(--color-accent)/25 hover:shadow-xl hover:shadow-(--color-accent)/35 transition-all"
    >
      {cta.text}
    </Button>
  );
};

export default PortfolioHeroButton;
