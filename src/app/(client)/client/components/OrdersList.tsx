"use client";
import MyOrderCard from "./MyOrderCard";
import { IServiceOrderTable } from "@/modules/services/domain/types/service.types";

const OrdersList = ({ orders }: { orders: IServiceOrderTable[] }) => {
  // const { data: ordersData, isLoading } = useGetOrderByClient();
  // console.log(orders);

  // if (isLoading) return <div>Loading...</div>;

  return orders.map((order) => {
    return <MyOrderCard order={order} key={order.id} />;
  });
};

export default OrdersList;
