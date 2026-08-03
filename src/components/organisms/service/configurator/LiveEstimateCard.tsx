import { IPriceCalculated } from "../../../molecules/ConfigureReviewList";
import PriceRow from "../../../molecules/PriceRow";
import Title from "@/shared/ui/Title";

const LiveEstimateCard = ({ price }: { price: IPriceCalculated }) => {
  return (
    <div className="p-4 border rounded">
      <Title as={"h3"} className="font-semibold">
        Live estimate
      </Title>
      <div className="mt-3 space-y-2">
        <div className="flex justify-between text-sm">
          <PriceRow description="Base" price={price.base} />
        </div>
        <div className="flex justify-between text-sm">
          <PriceRow description="Options" price={price.optionsPrice} />
        </div>
        <div className="flex justify-between text-sm">
          <PriceRow description="Discount" price={price.discount} />
        </div>

        <hr />
        <div className="flex justify-between font-bold text-lg">
          <PriceRow
            description="Estimated"
            price={price.base + price.optionsPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveEstimateCard;
