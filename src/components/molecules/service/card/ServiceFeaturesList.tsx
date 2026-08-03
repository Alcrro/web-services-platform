import { IServiceFeature } from "@/modules/services/domain/types/service.types";
import { FC } from "react";
import ServiceFeatureListItem from "./ServiceFeatureListItem";

interface IServiceFeaturesProps {
  features: IServiceFeature[];
  variant?: "included" | "addon";
}

const ServiceFeaturesList: FC<IServiceFeaturesProps> = ({
  features,
  variant = "included",
}) => {
  return features.map((feature) => (
    <ServiceFeatureListItem
      key={feature.id}
      name={feature?.feature?.name ?? "Unknown feature"}
      variant={variant}
    />
  ));
};

export default ServiceFeaturesList;
