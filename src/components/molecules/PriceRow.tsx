import { formatPriceValue } from "@/shared/utils/formatServicesPrice";

const PriceRow = ({
  description,
  price,
}: {
  description: string;
  price: number;
}) => {
  return (
    <>
      <div>{description}</div>
      <div>{formatPriceValue(price)}</div>
    </>
  );
};

export default PriceRow;
