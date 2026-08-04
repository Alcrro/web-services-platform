import MyOrderCard from "../MyOrderCard";
import { OrdersAction } from "@/modules/orders/application/orders.action";

const ActiveProjects = async ({
  searchParams = {},
}: {
  params?: string[];
  searchParams?: Record<string, string | string[]>;
}) => {
  const searchPar = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => searchPar.append(key, v));
    } else if (value !== undefined && value !== null) {
      searchPar.set(key, value);
    }
  });

  searchPar.set("status", "in-progress");

  const ordersAction = new OrdersAction();
  const orders = await ordersAction.getAllTableOrders(
    Object.fromEntries(searchPar.entries())
  );

  const { data } = orders;

  return (
    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((order) => (
        <MyOrderCard order={order} key={order.id} />
      ))}
    </div>
  );
};

export default ActiveProjects;
