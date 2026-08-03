import { IService } from "../../domain/types/service.types";

const ServiceCard = ({ serviceCard }: { serviceCard: IService }) => {
  return <div>{serviceCard.pricingConfig?.displayPrice ?? null}</div>;
};

export default ServiceCard;
