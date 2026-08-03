import { useServiceConfiguratorStore } from "@/context/useServiceConfiguratorStore";
import { FC } from "react";
import ConfigReviewRow from "./PriceRow";

export interface IPriceCalculated {
  base: number;
  optionsPrice: number;
  discount: number;
  total: number;
}
interface IConfigReviewListProps {
  serviceName: string;
  price: IPriceCalculated;
}
const ConfigureReviewList: FC<IConfigReviewListProps> = ({
  serviceName,
  price,
}) => {
  const { contactInfo, quantity } = useServiceConfiguratorStore(
    (store) => store
  );
  return (
    <div className="p-4 border rounded space-y-3">
      <div className="flex justify-between">
        <div>Service</div>
        <div>{serviceName ?? "—"}</div>
      </div>
      {Object.entries(contactInfo).map(
        ([key, val]) =>
          val && (
            <div className="flex justify-between" key={key}>
              <div className="capitalize">{key}</div>
              <div>{!val ? "-" : val}</div>
            </div>
          )
      )}
      <div className="flex justify-between">
        <ConfigReviewRow description="Base" price={price.base} />
      </div>
      <div className="flex justify-between">
        <ConfigReviewRow description="Options" price={price.optionsPrice} />
      </div>
      <div className="flex justify-between">
        <ConfigReviewRow description="Discount" price={price.discount} />
      </div>
      <div className="flex justify-between font-bold">
        <ConfigReviewRow
          description={`Total x${quantity}`}
          price={price.total}
        />
      </div>
    </div>
  );
};

export default ConfigureReviewList;
