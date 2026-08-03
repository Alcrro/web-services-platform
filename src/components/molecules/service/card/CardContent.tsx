import { FC, ReactNode } from "react";
import ServiceCardHeader from "../../Cards/services/ServiceCardHeader";
interface ICardContentProps {
  children: ReactNode;
  service: { name: string; description: string };
}
const CardContent: FC<ICardContentProps> = ({ children, service }) => {
  return (
    <div className="flex flex-col h-full  max-[320px]:p-4">
      <div className="head text-center mb-4">
        <ServiceCardHeader
          description={service.description}
          name={service.name}
        />
      </div>

      <div className="flex flex-col gap-2 justify-between h-full">
        {children}

        <div className="flex flex-col gap-1 text-sm text-gray-500 my-4 mt-auto"></div>
      </div>
    </div>
  );
};

export default CardContent;
