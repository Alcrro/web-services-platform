import { serviceNameHeaderColumnMapper } from "@/modules/services/domain/types/service.types";
import ServiceOrderStatisticsInteractive from "./ServiceOrderStatisticsInteractive";
import Title from "@/shared/ui/Title";
import { OrdersAction } from "@/modules/orders/application/orders.action";

const ServiceOrderStatistics = async () => {
  const ordersAction = new OrdersAction();

  const orders = await ordersAction.getAllTableOrders({});

  const { data } = orders;

  const serviceCountsArray = Object.entries(serviceNameHeaderColumnMapper).map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, v]) => {
      const count = data.filter(
        (o) =>
          o.uniqueServiceId &&
          serviceNameHeaderColumnMapper[
            o.uniqueServiceId as keyof typeof serviceNameHeaderColumnMapper
          ] === v
      ).length;

      return { name: v, value: count };
    }
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <Title as="h1" className="text-4xl font-semibold py-6">
        Statistics
      </Title>
      <ServiceOrderStatisticsInteractive
        pieData={serviceCountsArray}
        orders={data}
      />
    </div>
  );
};

export default ServiceOrderStatistics;
