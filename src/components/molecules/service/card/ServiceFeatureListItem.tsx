import Feature from "./Feature";

const ServiceFeatureListItem = ({
  name,
  variant = "included",
}: {
  name: string;
  variant?: "included" | "addon";
}) => {
  return <Feature feature={name ?? "Unknown Feature"} variant={variant} />;
};

export default ServiceFeatureListItem;
