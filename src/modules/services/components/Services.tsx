import ServicesCards from "@/components/molecules/service/card/ServicesCards";
import { IService } from "../domain/types/service.types";

const Services = ({ services }: { services: IService[] }) => {
  return <ServicesCards services={services} />;
};

export default Services;
