import OrdersList from "./OrdersList";

import { fetchOrdersByClient } from "./services/fetchOrdersByClient";
import { ordersTableMapper } from "@/modules/orders/infrastructure/serviceOrderMapper";

interface IServiceOrderProps {
  searchParams?: Record<string, string | string[]>;
}

const MyOrders = async ({}: IServiceOrderProps) => {
  // const options: IFiltersServiceOrders =
  //   mapSearchParamsOptions<IServiceOrder>(searchParams);

  const orders = await fetchOrdersByClient();

  const ordersMapped = orders.map(ordersTableMapper);

  return (
    <div className="flex flex-col gap-2">
      <div className="title flex justify-between">
        <div>My orders</div>
        <div className="">
          NO. Orders: <span>{orders.length}</span>
        </div>
      </div>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <OrdersList orders={ordersMapped} />
      </div>
    </div>
  );
};

export default MyOrders;
